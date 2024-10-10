// Importing necessary modules
const express = require('express'); // Express.js framework
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const puppeteer = require('puppeteer'); // Library for controlling headless Chrome/Chromium
const cors = require('cors'); // Middleware for enabling CORS

// Creating an Express application
const app = express();
const port = 3000;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Output Page');
});

// Define a route for scraping TikTok (first version)
app.post('/scrape-tiktok1', async (req, res) => {
    const { query, count } = req.body;

    try {
        const browser = await puppeteer.launch({
            headless: false, // Keep headless off for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        const formattedQuery = query.replace(" ", "%20");
        const url = `https://www.tiktok.com/search?q=${formattedQuery}&type=video`;

        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        } catch (error) {
            console.error('Navigation error:', error);
            await browser.close();
            return res.status(500).send(`Navigation error: ${error.message}`);
        }

        // Scrape post details
        const postDetails = await page.evaluate(() => {
            const posts = Array.from(document.querySelectorAll('div[data-e2e="search-card-item"]')); // Adjust the selector
            return posts.map(post => {
                const username = post.querySelector('a[data-e2e="search-card-user-unique"]')?.innerText || 'Unknown';
                const link = post.querySelector('a[data-e2e="search-common-link"]')?.href || 'No link';
                const caption = post.querySelector('span[data-e2e="video-caption"]')?.innerText || 'No caption';
                const date = post.querySelector('span[data-e2e="video-published"]')?.innerText || 'Unknown date';
                return { username, link, caption, date };
            });
        });

        await browser.close();

        // Limit the number of results to the count provided
        const limitedPostDetails = postDetails.slice(0, count);

        res.json({
            query,
            count,
            posts: limitedPostDetails
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Define a route for scraping TikTok (second version)
app.post('/scrape-tiktok2', async (req, res) => {
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

// Define a route for scraping TikTok (third version)
app.post('/scrape-tiktok3', async (req, res) => {
    const { query, count } = req.body;

    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        const formattedQuery = query.replace(" ", "%20");
        const url = `https://www.tiktok.com/search?q=${formattedQuery}&type=video`;

        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        } catch (error) {
            console.error('Navigation error:', error);
            await browser.close();
            return res.status(500).json({ error: `Navigation error: ${error.message}` });
        }

        const htmlContent = await page.content();
        await browser.close();

        res.json({
            query,
            count,
            htmlContent
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: `Error: ${error.message}` });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

