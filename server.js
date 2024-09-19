const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Output Page');
});

app.post('/scrape-tiktok', async (req, res) => {
    const { query, count } = req.body;

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        const formattedQuery = query.replace(" ", "%20");
        const url = `https://www.tiktok.com/search?q=${formattedQuery}&type=video`;

        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }); // Increased timeout
        } catch (error) {
            console.error('Navigation error:', error);
            await browser.close();
            return res.status(500).send(`Navigation error: ${error.message}`);
        }

        // Scrape the raw HTML content
        const htmlContent = await page.content();

        await browser.close();

        // Render the raw HTML content on the localhost page
        res.send(`
            <h1>Scraped TikTok HTML Content</h1>
            <p>Query: ${query}</p>
            <p>Count: ${count}</p>
            <pre>${htmlContent}</pre>
            <a href="/">Go Back</a>
        `);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(`Error: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

