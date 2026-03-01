const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Real Memory Database (Temporary - Resets on restart)
const urlDatabase = {};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 1. URL Shortener Logic (WORKING ✅)
app.post('/api/shorten', (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: 'URL required' });
    
    // Random ID banana
    const shortId = Math.random().toString(36).substring(2, 8);
    urlDatabase[shortId] = longUrl;
    
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;
    res.json({ shortUrl });
});

// 2. Redirect Logic (WORKING ✅)
app.get('/:shortId', (req, res) => {
    const longUrl = urlDatabase[req.params.shortId];
    if (longUrl) {
        return res.redirect(longUrl);
    }
    res.status(404).send('<h1>Invalid Link - Smart Marketing Pro</h1>');
});

app.listen(PORT, () => console.log(`Smart Marketing Pro is LIVE on port ${PORT}`));
