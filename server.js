const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const games = {};

io.on('connection', (socket) => {
    console.log('Ein Spieler ist verbunden.');

    socket.on('join', (room) => {
        socket.join(room);

        if (!games[room]) {
            games[room] = { board: Array(9).fill(''), turn: 'X', players: [] };
        }

        const game = games[room];
        if (game.players.length < 2) {
            game.players.push(socket.id);
        }

        const playerSymbol = game.players[0] === socket.id ? 'X' : 'O';
        socket.emit('start', { board: game.board, turn: game.turn, player: playerSymbol });

        if (game.players.length === 2) {
            io.to(room).emit('ready');
        }
    });

    socket.on('move', ({ room, index, player }) => {
        const game = games[room];
        if (game.turn !== player || game.board[index] !== '') return;

        game.board[index] = player;
        game.turn = player === 'X' ? 'O' : 'X';

        io.to(room).emit('update', { board: game.board, turn: game.turn });

        if (checkWinner(game.board)) {
            io.to(room).emit('win', { winner: player });
            delete games[room];
        }
    });

    socket.on('disconnect', () => {
        console.log('Ein Spieler hat das Spiel verlassen.');
    });
});

function checkWinner(board) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo =>
        board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]
    );
}

server.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});
