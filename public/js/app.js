$(document).ready(function () {

    console.log('Client side JS is loaded!');

    // const url1 = 'https://puzzle.mead.io/puzzle';
    // fetch(url1)
    //     .then(response => response.json())
    //     .then(data => console.log('promise', data))
    //     .catch(e => console.log(e));
    //
    // const url2 = '/weather?address=Boston';
    // const fetchAsync = async (url) => {
    //     const response = await fetch(url);
    //     return await response.json();
    // }
    // fetchAsync(url2).then(data => console.log('async', data));

    const form = document.querySelector('form');
    const search = document.querySelector('input');
    const message1 = document.querySelector('.message-1');
    const message2 = document.querySelector('.message-2');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        message1.textContent = 'Loading...';
        message2.textContent = '';

        const url = '/weather?address=' + search.value;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.error !== undefined) {
                    message1.textContent = 'Error: ' + data.error;
                    message2.textContent = '';
                    return;
                }
                message1.textContent = data.location + '(' + data.coordinates.latitude + ' ' + data.coordinates.longitude + ')'
                message2.textContent = data.forecast;
            })
            .catch(e => {
                console.log('Error: ' + e);
            });
    });
})