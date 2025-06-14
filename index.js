const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.post('/webhook', (req, res) => {
    const { data } = req.body;

    if (!data || typeof data !== 'string') {
        return res.status(400).json({ error: 'Invalid data field. Must be a string.' });
    }

    const sortedChars = data.split('').sort();
    res.json({ word: sortedChars });
});

// Run server if not in Vercel
if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
}


// Export for Vercel (API-compatible)
module.exports = app;
