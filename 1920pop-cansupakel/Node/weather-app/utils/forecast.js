const request =require('request');

const forecast = (latitude, longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/636329bc988959038d08e478e8100926/' + latitude  +',' + longitude + '?units=si&lang=nl'
   
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Error 443',undefined)
        }else if(body.error){
            callback('Unable to find location 400',undefined)
        }else {
            callback(undefined,body.daily.data[0].summary+ ' Het is '+body.currently.temperature + 'graden. Er is ' +  body.currently.precipProbability + ' % kans op regen' )
        }
    })
}

module.exports = forecast