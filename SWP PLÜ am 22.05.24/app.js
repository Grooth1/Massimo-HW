const express = require('express');
const app = express();
const port = 3000;
const host = '0.0.0.0';
const prisma = require('./lib/db');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/', express.static('static'));

app.get('/', async (req, res) => {
    res.render('index', { zoos: await prisma.zoo.findMany() });
});

app.get('/zoo/:id', async (req, res) => {
    const id = req.params.id;
    const zo = await prisma.zoo.findUnique({
        where: { id: id },
        include: {
            abteilungen: { select: { name: true } }
        }
    });
    return res.render('details', { zoo: zo });
});
    app.get('/abteilung/:id', async (req, res) => {
    const id = req.params.id;
    const abteilung = await prisma.abteilung.findUnique({
        where: { id: id },
        include: {
            tiere: true,
            mitarbeiter: true
        }
    });
    return res.render('abteilungDetails', { abteilung: abteilung });
    });

  
    app.get('/mitarbeiter/:id', async (req, res) => {
    const id_m = req.params.id;
    const m = await prisma.mitarbeiter.findUnique({
        where: { id: id_m },
        include: {
            abteilung: { select: { name: true } }
        }
    });
        return res.render('mitarbeiter', { mitarbeiter: m });
        
    });

    app.post('/tier/aendern', (req, res) => {
    const tierId = req.body.tierId;
    const neuerName = req.body.neuerName;
        const query = 'UPDATE tiere SET name = ? WHERE id = ?';
    db.query(query, [neuerName, tierId], (error, results) => {
        if (error) {
        console.error('Fehler beim Aktualisieren des Tieres:', error);
        res.status(500).send('Serverfehler');
        } else {
        res.redirect('/');
        }
    }); 
    });
app.get('/htmx/', (req, res, next) => {
    if (req.originalUrl.endsWith('/')) return res.redirect('/htmx');
    next();
});
app.get('/htmx', async (req, res) => {
    res.render('htmx');
});
app.post('/htmx-click', (req, res) => {
    res.render('htmx-click');
});
app.listen(port, host, () => {
    console.log(`Example app listening on http://${host}:${port}`);
});
