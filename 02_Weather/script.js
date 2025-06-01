document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById("city-input");
    const getWeather = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const tempDiplay = document.getElementById("temperature");
    const discriptionDisplay = document.getElementById("description");
    const errorMsg = document.getElementById("error-message");
    const API_KEY = "2f9f76582c3869a2c55a118cc74ffb5e";
    getWeather.addEventListener("click",async()=>{
        const city = cityInput.value.trim();
        if(!city) return;

        //it may throw an erroe
        // server is always in another continent
        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }catch(error){
            showError();
        }

    })

    async function fetchWeatherData(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE" , response);

        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }
    function displayWeatherData(data){
        //display
        console.log(data);
        const {name,main,weather} = data;
        cityNameDisplay.textContent = name;

        tempDiplay.textContent = `Temperature : ${main.temp}`;
        discriptionDisplay.textContent = `Weather: ${weather[0].description}`;
        //unlock the display
        weatherInfo.classList.remove("hidden")
        errorMsg.classList.add("hidden");
    }
    function showError(){
        weatherInfo.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }
})