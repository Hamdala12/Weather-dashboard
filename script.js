const apiKey = '5e7cd25d85701ad9d4153ed9cda498a3'; 
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    const city = document.getElementById('cityInput').value;

    if (city === '') {
        alert('New york');
        return;
    }

    
    fetch(`${weatherUrl}?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data))
        .catch(error => alert('Error fetching current weather data: ' + error));

    
    fetch(`${forecastUrl}?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => alert('Error fetching forecast data: ' + error));
}

function displayCurrentWeather(data) {
    const cityName = document.getElementById('cityName');
    const currentTemperature = document.getElementById('currentTemperature');
    const currentConditions = document.getElementById('currentConditions');
    const currentHumidity = document.getElementById('currentHumidity');
    const currentWind = document.getElementById('currentWind');

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    currentTemperature.textContent = `Temperature: ${data.main.temp}°C`;
    currentConditions.textContent = `Conditions: ${data.weather[0].description}`;
    currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    currentWind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; 

    const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00')); 

    forecastData.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString();
        const temp = day.main.temp;
        const description = day.weather[0].description;
        const icon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;

        const dayCard = document.createElement('div');
        dayCard.className = 'col-lg-2 col-md-4 col-sm-6 day';
        dayCard.innerHTML = `
            <div class="card text-center">
                <div class="card-body">
                    <h5>${date}</h5>
                    <img src="${icon}" alt="${description}" />
                    <p>${temp}°C</p>
                    <p>${description}</p>
                </div>
            </div>
        `;

        forecastContainer.appendChild(dayCard);
    });
}












