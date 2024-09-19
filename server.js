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
        // Launch Puppeteer and Chromium that comes bundled with it
        const browser = await puppeteer.launch({
            headless: false, // Set to false so you can see it working
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add sandbox arguments for Linux
        });

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

        // Here, you would add code to scroll and extract data such as usernames, captions, and dates.
        const postDetails = await page.evaluate(() => {
            // Example data scraping for video posts, modify according to the page structure
            const posts = Array.from(document.querySelectorAll('.tiktok-post-class'));  // Change the selector based on actual HTML
            return posts.map(post => {
                const username = post.querySelector('.username-class').innerText;  // Replace with actual class name
                const caption = post.querySelector('.caption-class').innerText;   // Replace with actual class name
                const date = post.querySelector('.date-class').innerText;         // Replace with actual class name
                return { username, caption, date };
            });
        });

        await browser.close();

        // Send the scraped data back as JSON
        res.json({ query, count, postDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(`Error: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
