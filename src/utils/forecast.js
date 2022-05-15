const fetch = require('node-fetch');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca37374410ef2f88b56c6c32c48fb115&query=' + latitude + ',' + longitude;
    fetch(url)
        .then(response => response.json())
        .then(json => {
            const forecast = json.current.weather_descriptions[0] + '. '
                + 'It is currently: ' + json.current.temperature + 'C degrees out. '
                + 'It feels like: ' + json.current.feelslike + 'C degrees out. '
                + 'The humidity is: ' + json.current.humidity + '%';
            const response = {
                data: json,
                forecast: forecast
            }
            callback(undefined, response);
        })
        .catch(error => {
            console.log(error);
            callback('Error occurred');
        });
}

module.exports = forecast;