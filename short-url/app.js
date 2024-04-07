// a program that helps to shorten a url
const express = require('express');
const app = express();

// Object to store the mapping between short IDs and long URLs
const urlMap = {};

// Generate a random 6-character alphanumeric string
function generateShortId() {
    return Math.random().toString(36).substr(2, 6);
}

// Shorten URL endpoint
app.post('/shorten', (req, res) => {
    const longUrl = req.body.longUrl;
    const shortId = generateShortId();
    urlMap[shortId] = longUrl;
    res.json({ shortUrl: `http://localhost:3000/${shortId}` });
});

// Redirect endpoint for short URLs
app.get('/:shortId', (req, res) => {
    const shortId = req.params.shortId;
    const longUrl = urlMap[shortId];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('Short URL not found');
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
