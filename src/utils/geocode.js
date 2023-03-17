const request = require('postman-request')

const coord = (address, callback)=>{
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibW9zdGFmYTE0NSIsImEiOiJjbGVwcGMyNGUwNnN5M3NwaHNuNmRraHFmIn0.HjWujcT4JS-nCh36b_VP6g"
  request({url, json:true},function(error, {body}){
    if(body.features.length == 0)
    {
        callback("Unable to find location", undefined)
    }
    else 
    {
        callback(undefined, body.features[0].geometry.coordinates, body.features[0].place_name)
    }
  })
}
module.exports = coord