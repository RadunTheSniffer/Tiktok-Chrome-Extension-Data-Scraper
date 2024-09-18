document.getElementById('scrapeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('username').value;
    const count = document.getElementById('count').value;

    try {
        const response = await fetch('http://localhost:3000/scrape-tiktok', { // Update the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, count }) // Ensure the field names match those expected by Express
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById('results').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('results').innerText = `Error: ${error.message}`;
    }
});