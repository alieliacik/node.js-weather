const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode, forecast } = require('./utils')
const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ali Eliacik'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ali Eliacik'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text',
    name: 'Ali Eliacik'
  })
})

app.get('/weather', (req, res) => {

  const { address } = req.query

  if (!address) {
    return res.send({
      error: 'Address must be provided'
    })
  }

  geocode(address, (error, { longitude: long, latitude: lat } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        address,
        long,
        lat
      })
    })
  })
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'Ali Eliacik',
    title: "404",
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    name: 'Ali Eliacik',
    title: "404",
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})