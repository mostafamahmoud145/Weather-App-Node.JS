const request = require('postman-request')

const temp = (lon, lat, callback)=>{
  const url = "http://api.weatherstack.com/current?access_key=f08979c5293f57e896bcda9a5bdf629d&query=" + lat + ',' + lon
  request({url: url, json:true},function(error, {body}){
    
    if(body.error)
    {
        callback("Unable to find location", undefined)
    }
    else 
    {
        callback(undefined, body.current.temperature)
    }
  })
}

module.exports = temp