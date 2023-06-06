/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '8eddd8b15113b37ccf91a786dc792e67';

/* Function called by event listener */
const performAction = () => {
    const zipcode = document.getElementById('zip').value;
    getWeather(baseUrl, zipcode, apiKey).then(async function (data) {
        const feelings = document.getElementById('feelings').value;
        await postData('http://localhost:3000/add', {temp: data.main.temp, date: newDate, feel: feelings});
    }).then(async function() {
        await getProjectData();
    })
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function to GET Web API Data*/
const getWeather = async (baseUrl, zipcode, apiKey) => {
    const url = `${baseUrl}?zip=${zipcode},de&appid=${apiKey}&units=imperial`;
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (e) {
        console.error(e);
    }
}

/* Function to GET Project Data */
const getProjectData = async () => {
    const response = await fetch('http://localhost:3000/all');
    try {
        const data = await response.json();
        console.log(data);
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(data.temp)+ 'degrees';
        document.getElementById('content').innerHTML = data.feel;
        document.getElementById('date').innerHTML = data.date;
    } catch (e) {
        console.error(e);
    }
}