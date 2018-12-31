
fetch('https://sodapopped.com/api/reviews?id=nikmd23')
.then(response => {
    if (response.ok)
        return response;

    throw new Error('there was an error');
})
.then(response => response.json())
.then(response => console.dir(response) || response)
.catch(console.error);
