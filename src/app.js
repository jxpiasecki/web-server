const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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
        name: process.env.npm_package_author_name,
    });
});
app.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'About Hbs',
        name: process.env.npm_package_author_name,
    });
});
app.get('/help', (req, res, next) => {
    res.render('help', {
        title: 'Help Hbs',
        name: process.env.npm_package_author_name,
    });
});

app.get('/weather', (req, res, next) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        });
    }

    const address = decodeURIComponent(req.query.address);
    //address = 'Przecław 52, 72-005 Przecław, województwo zachodniopomorskie, Polska';
    //address = 'Barnówko 50, 74-311 Barnówko, województwo zachodniopomorskie, Polska';
    //address = 'Płoty, 72-310 Płoty, województwo zachodniopomorskie, Polska';
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

// app.get('/products', (req, res, next) => {
//     console.log(req.query.param1);
//     res.send({
//         products: []
//     });
// });

app.get('/help/*', (req, res, next) => {
    res.render('errors/404', {
        title: 'Help 404 page',
        name: process.env.npm_package_author_name,
        message: 'Article not found'
    });
});

app.get('/*', (req, res, next) => {
    res.render('errors/404', {
        title: 'Error 404 page',
        name: process.env.npm_package_author_name,
        message: 'Page not found'
    });
});

app.listen(appPort, () => console.log('Server started on port: ' + appPort));