const request = require('request')

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${decodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxpZWxpYWNpayIsImEiOiJjbDZjd2Z1MmkxcXZmM2Ryejg0bzlwdzY4In0.7jiXgfvSS4E1sggtBDILTw&limit=5`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect', undefined)
    } else if (body.features.length === 0) {
      cb('Unable to connect', undefined)
    } else {
      cb(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      })
    }
  })
}

const forecast = (lat, long, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=9d07595030eda09608294ff3e3df4f8f&query=${lat},${long}&unit=f`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect', undefined)
    } else if (body.error) {
      cb('Unable to connect', undefined)
    } else {
      cb(undefined, `${body.current.weather_descriptions[0]}`)
    }
  })
}


module.exports = { geocode, forecast }