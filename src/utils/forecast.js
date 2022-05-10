const fetch = require('node-fetch');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca37374410ef2f88b56c6c32c48fb115&query=' + latitude + ',' + longitude;
    fetch(url)
        .then(response => response.json())
        .then(json => {
            const data = {
                temperature: json.current.temperature
            }
            callback(undefined, data);
        })
        .catch(error => {
            console.log(error);
            callback('Error occured');
        });
}

module.exports = forecast;