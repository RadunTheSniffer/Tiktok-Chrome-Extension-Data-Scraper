# TikTok Scraper Extension

## Overview
The TikTok Scraper Extension is a Chrome extension designed to scrape TikTok data based on user input. It allows users to enter a TikTok query or topic and the number of posts they want to scrape, and then displays the scraped data in a new tab. End goal is to create an API server to handle requests from client extension, to facilitate with research and analysis.

# Problem Statement
Most scrapers package are outdated and deprecated. On the other hand, tools like Selenium and Playwright are hard to implement and maintain due to incompatible versions (chromedriver mismatch) and implementation error. Creating an API Server to faciliate the scrapeing will allow for a more scalable and usage. The API Server can then be further enhanced with  tools like Llama3 or public NLP models in HuggingFace for tasks like sentiment analysis, contextual understanding, trend research and statistics.


## Features
- Scrape TikTok data by query
- Specify the number of posts to scrape.
- Display scraped data in a user-friendly format.
- View media content directly in the extension.

## Installation
1. Clone or download the repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable Developer mode by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.

## Usage
1. Click on the TikTok Scraper Extension icon in the Chrome toolbar.
2. Enter the TikTok query and the number of posts you want to scrape.
3. Click the "Scrape" button.
4. A new tab will open displaying the scraped data.

## Files
- `manifest.json`: Configuration file for the Chrome extension.
- `popup.html`: HTML file for the extension's popup interface.
- `popup.js`: JavaScript file for handling form submission and sending requests.
- `output.html`: HTML file for displaying the scraped data.
- `output.js`: Service worker script for for rendering the scraped data in the new tab.
- `server.js`: Handling extension request and scraping process

## License
This project is licensed under the MIT License.


# Contact info
Contact me here if there's anything 
Email: ridhuan.work2001@gmail.com
Instagram: radunnnnn


