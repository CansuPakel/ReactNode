const request =require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const address = process.argv[2]

if(!address){
    console.log('Please enter an address')
}else{
    geocode(address, (error, { latitude, longitude, location }) => {
        if(error){
           return console.log(error)
        }
    
        forecast(latitude,longitude, (errorForec, dataForec) => {
            if(errorForec){
                return console.log(errorForec)
            }
            console.log(location)
            console.log(dataForec)
        })
        
    })
}