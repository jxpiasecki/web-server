const fetch = require('node-fetch');

const Mock = require('./mock');

const geocode = (address, callback) => {

    const json = Mock.get('geocode', address);
    if (json) {
        const data = {
            latitude: json.features[0].center[1],
            longitude: json.features[0].center[0],
            location: json.features[0].place_name,
        }
        callback(undefined, data)
        return;
    }

    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address);
    url += '.json?access_token=pk.eyJ1IjoiamFudXN6MyIsImEiOiJjbDJqYm15NTkwdzA5M2JwaGYxbzE3emk4In0.yvWB712dLhDm-pl6MJkgbg&language=pl';

    fetch(url)
        .then(response => response.json())
        .then(json => {
            Mock.put('geocode', address, json);
            const data = {
                latitude: json.features[0].center[1],
                longitude: json.features[0].center[0],
                location: json.features[0].place_name,
            }
            callback(undefined, data)
        })
        .catch(error => callback('Error. Unable to get latitude or longitude for provided address'));
}

module.exports = geocode;