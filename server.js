const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Mock Database for URL Shortening
const urlDatabase = {};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// URL Shortener API
app.post('/api/shorten', (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: 'URL required' });
    
    const shortId = Math.random().toString(36).substring(2, 7);
    urlDatabase[shortId] = longUrl;
    
    res.json({ shortUrl: `https://${req.get('host')}/${shortId}` });
});

// Redirect Logic
app.get('/:shortId', (req, res) => {
    const longUrl = urlDatabase[req.params.shortId];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('Invalid Link - Smart Marketing Pro');
    }
});

app.listen(PORT, () => console.log(`Smart Marketing Pro running on port ${PORT}`));