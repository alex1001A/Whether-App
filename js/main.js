const apiKey = '4805aa5bf86a96924ec606ccc28a4ccb'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

let searchInpCityName = document.querySelector('.search__input')
let searchBtn = document.querySelector('.search__btn')

let weatherBlog = document.querySelector('.weather')

let cityName = document.querySelector('.weather__city')
let cityTemp = document.querySelector('.weather__temp')
let weatherIcon = document.querySelector('.weather__icon')

let humidity = document.querySelector('.humidity')

let wind = document.querySelector('.wind')

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    
    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block'
        weatherBlog.style.display = 'none'
    } else {
        let data = await response.json()
    
        console.log(data);
    
        cityName.innerHTML = data.name;
        cityTemp.innerHTML = Math.round(data.main.temp) + '°C';
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = Math.round(data.wind.speed) + ' ' + 'km/h';
    
        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = './img/weather-icons/cloudy.png'
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = './img/weather-icons/sunny.png'
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = './img/weather-icons/rain.png'
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = './img/weather-icons/drizzle.png'
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = './img/weather-icons/mist.png'
        }
    
        document.querySelector('.error').style.display = 'none'
        weatherBlog.style.display = 'block'
    }

}

searchBtn.addEventListener('click', () => {
    checkWeather(searchInpCityName.value)

    searchInpCityName.value = ''
})

