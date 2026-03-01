const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const urlDatabase = {};

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// 1. URL Shortener API
app.post('/api/shorten', (req, res) => {
    const { longUrl, customAlias } = req.body;
    const shortId = customAlias ? customAlias.replace(/[^a-zA-Z0-9]/g, '') : Math.random().toString(36).substring(2, 8);
    urlDatabase[shortId] = longUrl;
    res.json({ shortUrl: `https://${req.get('host')}/${shortId}` });
});

// 2. Redirect Logic
app.get('/:shortId', (req, res) => {
    const longUrl = urlDatabase[req.params.shortId];
    if (longUrl) return res.redirect(longUrl);
    res.status(404).send('<h1>Link Not Found - Smart Marketing Pro</h1>');
});

app.listen(PORT, () => console.log('Smart Marketing Pro is Live!'));
