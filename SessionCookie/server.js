const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware konfigurieren
app.use(bodyParser.urlencoded({ extended: true }));

// Session-Management einrichten
app.use(session({
    secret: 'deinGeheimerSchluessel', // Wähle einen sicheren, zufälligen Schlüssel
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Setze auf `true`, wenn HTTPS verwendet wird
}));

// Statische Dateien bereitstellen
app.use(express.static('public'));

// Beispiel-Benutzer (hier kannst du später eine Datenbank einfügen)
const users = {
    user1: { username: 'user1', password: 'passwort123' }
};

// Login-Seite anzeigen
app.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard'); // Wenn bereits eingeloggt, zum Dashboard weiterleiten
    }
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Login-Formular auswerten
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (user && user.password === password) {
        req.session.user = user; // Benutzer in der Session speichern
        return res.redirect('/dashboard');
    }
    res.redirect('/login?error=true'); // Bei falschen Anmeldedaten zur Login-Seite zurück
});

// Geschützte Dashboard-Seite
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Falls nicht eingeloggt, zur Login-Seite weiterleiten
    }
    res.send(`<h1>Willkommen, ${req.session.user.username}!</h1><a href="/logout">Abmelden</a>`);
});

// Logout-Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Logout fehlgeschlagen.");
        }
        res.redirect('/login'); // Zur Login-Seite weiterleiten
    });
});

// Server starten
app.listen(4000, () => {
    console.log('Server läuft auf http://localhost:4000');
});
