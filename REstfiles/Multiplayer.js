

    const pokeAPIBaseUrl = "https://pokeapi.co/api/v2/pokemon/";
    const game = document.getElementById('game');





    const colors = {
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#fceaff',
        poison: '#98d7a5',
        bug: '#f8d5a3',
        dragon: '#97b3e6',
        psychic: '#eaeda1',
        flying: '#F5F5F5',
        fighting: '#E6E0D4',
        normal: '#F5F5F5'
    };


    let firstPick;
    let isPaused = true;
    let timer;

    const loadPokemon = async () => {
        const randomIds = new Set();
        while (randomIds.size < 8) {
            const randomNumber = Math.ceil(Math.random() * 150);
            randomIds.add(randomNumber);
        }
        const pokePromises = [...randomIds].map(id => fetch(pokeAPIBaseUrl + id))
        const results = await Promise.all(pokePromises);
        return await Promise.all(results.map(res => res.json()));
    }


    
    
    let foundPairs1 = 0;
    let tries = 0;
    let winner;
    
    let player1 ={
        name: "Player1",
        foundPairs: 0
    };
    let player2 = {
        name: "Player2",
        foundPairs: 0
    }
        
        
    
    let currentPlayer = player1.name;
    
    
    
    const switchPlayer = () => {
        if (currentPlayer === player1.name)
        {
            currentPlayer = player2.name;
        }
        else 
        {
            currentPlayer = player1.name;
            }
        }
    
    
  const checkWinner = async () =>
{
    if (player1.foundPairs > player2.foundPairs && foundPairs1 == 8)
    {
        alert("Spieler 1 hat gewonnen")
    }
    else {
        if(player2.foundPairs > player1.foundPairs && foundPairs1 == 8)
            alert("Spieler 2 hat gewonnen")
        
    }
        }



    const displayPokemon = (pokemon) => {
        pokemon.sort(_ => Math.random() - 0.5);
        const pokemonHTML = pokemon.map(pokemon => {
            const type = pokemon.types[0]?.type?.name;
            const color = colors[type] || '#F5F5F5';
            return `
          <div class="card" onclick="clickCard(event)" data-pokename="${pokemon.name}" style="background-color:${color};">
            <div class="front ">
            </div>
            <div class="back rotated" style="background-color:${color};">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"  />
            <h2>${pokemon.name}</h2>
            </div>
        </div>
    `}).join('');
        game.innerHTML = pokemonHTML;
    }

    const startTimer = () => {
        timer = setTimeout(() => {
            alert(`Spieler ${currentPlayer}, deine Zeit ist abgelaufen!`);
            switchPlayer();
            resetTimer();
        }, 5000);
    };

const resetTimer = () => {
    clearTimeout(timer);
    startTimer();

}
const clickCard = (e) => {
    const pokemonCard = e.currentTarget;
    const [front, back] = getFrontAndBackFromCard(pokemonCard)
    if (front.classList.contains("rotated") || isPaused) {
        return;
    }
    isPaused = true;
    rotateElements([front, back]);
    if (!firstPick) {
        firstPick = pokemonCard;
        isPaused = false;
        resetTimer();
    }
    else {
        const secondPokemonName = pokemonCard.dataset.pokename;
        const firstPokemonName = firstPick.dataset.pokename;
        if (firstPokemonName !== secondPokemonName) {
            const [firstFront, firstBack] = getFrontAndBackFromCard(firstPick);
            setTimeout(() => {
                rotateElements([front, back, firstFront, firstBack]);
                firstPick = null;
                isPaused = false;
                resetTimer();
                switchPlayer();
            }, 500)
            tries++;
            
             
        } else {
                
            tries++;
            currentPlayer.foundPairs+1;
            foundPairs1++;
            if (foundPairs1 === 8) {
                alert(`Spiel ist aus`);
                checkWinner();
                
            }
               
           
            

                firstPick = null;
                isPaused = false;
               
            resetTimer();
             
             document.getElementById("Player1Pairs").innerHTML = player1.foundPairs;
             document.getElementById("Player2Pairs").innerHTML = player2.foundPairs;
        }
      
        }
        document.getElementById("AktuellerSpieler").innerHTML = currentPlayer;
    }


   
        
        
    


    const getFrontAndBackFromCard = (card) => {
        const front = card.querySelector(".front");
        const back = card.querySelector(".back");
        return [front, back]
    }

    const rotateElements = (elements) => {
        if (typeof elements !== 'object' || !elements.length) return;
        elements.forEach(element => element.classList.toggle('rotated'));
    }

       
    
    const resetGame = async () => {
        clearTimeout(timer);
        game.innerHTML = '';
        isPaused = true;
        firstPick = null;
        tries = 0;
        foundPairs1 = 0;
        currentPlayer = player1;
        
        

        setTimeout(async () => {
            const loadedPokemon = await loadPokemon();
            displayPokemon([...loadedPokemon, ...loadedPokemon]);
            isPaused = false;
        }, 200)
        

    }
    resetGame();


    function SinglePlayer() {
        var zielseiteURL = "Pokemon.html";
    
    
        window.location.href = zielseiteURL;

    }
