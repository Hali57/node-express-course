// shorten the url using async function and access tokens

async function shortenUrl(longUrl, accessToken) {
    const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
    const requestBody = {
        long_url: longUrl
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        if (response.ok) {
            const data = await response.json();
            return data.link;
        } else {
            throw new Error('Failed to shorten URL');
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}