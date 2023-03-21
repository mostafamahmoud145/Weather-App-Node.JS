const path = require('path')
const express = require('express')
const { json } = require('express')
const hbs = require('hbs')
const coord = require('./utils/geocode')
const temp = require('./utils/forecast')

const port = process.env.PORT || 3000
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialDirectoryPath = path.join(__dirname, '../templates/partial')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mostafa Mahmoud'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mostafa Mahmoud'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Mostafa Mahmoud'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            "error": 'Error you must provide and address'
        })
    }
    else {
        coord(req.query.address, (error, response, place_name) => {
            if (error) {
                res.send({ error })
            }
            else {
                temp(response[0], response[1], (error, temprature) => {
                    if (error) {
                        res.send({ error })
                    }
                    else {
                        res.send({
                            lan: response[0],
                            lat: response[1],
                            temp: temprature,
                            place_name: place_name
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mostafa Mahmoud',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mostafa Mahmoud',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log("Server Is Work" + port)
})