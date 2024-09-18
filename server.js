const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express(); // Ensure this is declared only once
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/scrape-tiktok', async (req, res) => {
    const { query, count } = req.body;

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const formattedQuery = query.replace(" ", "%20");
        const url = `https://www.tiktok.com/search/video?q=${formattedQuery}`;

        await page.goto(url, { waitUntil: 'networkidle0' });

        // Add your scraping logic here
        const videoIDs = await page.evaluate(() => {
            const videos = document.querySelectorAll('div[data-e2e="search-item"]');
            return Array.from(videos).map(video => video.querySelector('a').href.split('/').pop());
        });

        await browser.close();

        res.json({ query, count, videoIDs });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

