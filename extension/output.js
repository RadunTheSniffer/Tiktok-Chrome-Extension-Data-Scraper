chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.htmlContent) {
        console.log('Received HTML content:', request.htmlContent);
        const container = document.getElementById('scrapedData');
        container.innerHTML = request.htmlContent;
    }
});
