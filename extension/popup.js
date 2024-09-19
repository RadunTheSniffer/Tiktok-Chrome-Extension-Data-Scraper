document.getElementById('scrapeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = document.getElementById('username').value;
    const count = document.getElementById('count').value;

    console.log('Form submitted:', { query, count });

    try {
        const response = await fetch('http://localhost:3000/scrape-tiktok3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, count })
        });

        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        chrome.tabs.create({ url: 'output.html' }, function (tab) {
            chrome.tabs.onUpdated.addListener(function (tabId, info) {
                if (info.status === 'complete' && tabId === tab.id) {
                    chrome.tabs.sendMessage(tabId, { htmlContent: responseText });
                }
            });
        });
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
});
