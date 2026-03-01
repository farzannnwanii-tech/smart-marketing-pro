const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const urlDatabase = {};

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// Custom Shorten Logic
app.post('/api/shorten', (req, res) => {
    const { longUrl, customAlias } = req.body;
    
    // Agar user ne custom naam diya hai toh wo use karo, warna random ID
    const shortId = customAlias ? customAlias.replace(/\s+/g, '-') : Math.random().toString(36).substring(2, 8);
    
    urlDatabase[shortId] = longUrl;
    
    // SSL (https) ke liye Render ka domain use karo
    const shortUrl = `https://${req.get('host')}/${shortId}`;
    res.json({ shortUrl });
});

app.get('/:shortId', (req, res) => {
    const longUrl = urlDatabase[req.params.shortId];
    if (longUrl) return res.redirect(longUrl);
    res.status(404).send('Invalid Smart Link');
});

app.listen(PORT, () => console.log('Bawal Server is Up!'));
