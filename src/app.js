const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const { author } = require('./../package.json');

const appPublicPath = path.join(__dirname, '..', 'public');
const appViewsPath = path.join(__dirname, '..', 'templates', 'views');
const appPartialsPath = path.join(__dirname, '..', 'templates', 'partials');
const appPort = process.env.PORT || 3003;

const app = express();
app.use(express.static(appPublicPath));

app.set('view engine', 'hbs');
app.set('views', appViewsPath);
hbs.registerPartials(appPartialsPath)

app.get('/', (req, res, next) => {
    res.render('index.hbs', {
        title: 'Weather Hbs',
        author,
    });
});
app.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'About Hbs',
        author,
    });
});
app.get('/help', (req, res, next) => {
    res.render('help', {
        title: 'Help Hbs',
        author,
    });
});

app.get('/weather', (req, res, next) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        });
    }

    const address = decodeURIComponent(req.query.address);
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecast,
                location: location,
                coordinates: {
                    latitude,
                    longitude
                },
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res, next) => {
    res.render('errors/404', {
        title: 'Help 404 page',
        message: 'Article not found',
        author,
    });
});

app.get('/*', (req, res, next) => {
    res.render('errors/404', {
        title: 'Error 404 page',
        message: 'Page not found',
        author,
    });
});

app.listen(appPort, () => console.log('Server started on port: ' + appPort));