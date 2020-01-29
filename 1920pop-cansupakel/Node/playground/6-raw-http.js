const https = require('https');
const url = 'https://api.darksky.net/forecast/636329bc988959038d08e478e8100926/51,5?units=si&lang=nl'
const request = https.request(url, (response)=> {
    let data=''
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})
request.on('error', (error) => {
    console.log('An error',error)
})
request.end();