$(document).ready(function () {

    console.log('Client side JS is loaded!');

    // const url1 = 'https://puzzle.mead.io/puzzle';
    // fetch(url1)
    //     .then(response => response.json())
    //     .then(data => console.log('promise', data))
    //     .catch(e => console.log(e));
    //
    // const url2 = 'http://localhost:3003/weather?address=Boston';
    // const fetchAsync = async (url) => {
    //     const response = await fetch(url);
    //     return await response.json();
    // }
    // fetchAsync(url2).then(data => console.log('async', data));

    const form = document.querySelector('form');
    const search = document.querySelector('input');
    const temperature = document.querySelector('.temperature');
    const address = document.querySelector('.address');
    const error = document.querySelector('.error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const url = 'http://localhost:3003/weather?address=' + search.value;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.error !== undefined) {
                    error.innerHTML = 'Error: ' + data.error;
                    temperature.innerHTML = '';
                    address.innerHTML = '';
                    return;
                }
                error.innerHTML = '';
                temperature.innerHTML = 'Current temperature: ' + data.forecast.temperature + ' C';
                address.innerHTML = 'Address: ' + data.location;
            })
            .catch(e => {
                console.log('Error: ' + e);
            });
    });
})