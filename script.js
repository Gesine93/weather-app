async function getWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?iconSet=icons1&key=7HLBA6BCS4PDD2RNMW2FY68XV`);
        const data = await response.json();
        return data;
    }
    catch(error) {
       return "Error";
    }
}

function populateHtml(data) {
    if (data && data.days && data.days.length > 0) {
        const city = document.querySelector("#city");
        const todayText = document.querySelector("#text");
        const maxtemptoday = document.querySelector(".today .left #info #maxtemp .temp");
        const mintemptoday = document.querySelector(".today .left #info #mintemp .temp");
        const iconnow = document.querySelector("#iconnow");
        const timenow = document.querySelector(".today .right #time");
        const tempnow = document.querySelector(".today .right #temp .temp");
        const units = document.querySelectorAll(".unit");

        const one_temp = document.querySelector(".one .temp");
        const two_temp = document.querySelector(".two .temp");
        const three_temp = document.querySelector(".three .temp");
        const four_temp = document.querySelector(".four .temp");
        const five_temp = document.querySelector(".five .temp");

        const one_text = document.querySelector(".one .text");
        const two_text = document.querySelector(".two .text");
        const three_text = document.querySelector(".three .text");
        const four_text = document.querySelector(".four .text");
        const five_text = document.querySelector(".five .text");

        const one_icon = document.querySelector(".one .icon");
        const two_icon = document.querySelector(".two .icon");
        const three_icon = document.querySelector(".three .icon");
        const four_icon = document.querySelector(".four .icon");
        const five_icon = document.querySelector(".five .icon");

        const one_date = document.querySelector(".one .date");
        const two_date = document.querySelector(".two .date");
        const three_date = document.querySelector(".three .date");
        const four_date = document.querySelector(".four .date");
        const five_date = document.querySelector(".five .date");
        
        
        // Today’s Weather
        todayText.textContent = data.days[0].description;
        maxtemptoday.textContent = data.days[0].tempmax;
        mintemptoday.textContent = data.days[0].tempmin;
        let now = new Date();
        let hrs = now.getHours().toString().padStart(2, '0');
        let mins = now.getMinutes().toString().padStart(2, '0');
        timenow.textContent = `${hrs}:${mins}`;
        tempnow.textContent = data.days[0].temp;
        iconnow.src = getIcon(data.days[0].icon);
        city.textContent = data.resolvedAddress;

        // Day 1 Forecast
        one_temp.textContent = data.days[1].temp;
        one_text.textContent = data.days[1].description;
        one_icon.src = getIcon(data.days[1].icon);
        one_date.textContent = data.days[1].datetime;

        // Day 2 Forecast
        two_temp.textContent = data.days[2].temp;
        two_text.textContent = data.days[2].description;
        two_icon.src = getIcon(data.days[2].icon);
        two_date.textContent = data.days[2].datetime;

        // Day 3 Forecast
        three_temp.textContent = data.days[3].temp;
        three_text.textContent = data.days[3].description;
        three_icon.src = getIcon(data.days[3].icon);
        three_date.textContent = data.days[3].datetime;

        // Day 4 Forecast
        four_temp.textContent = data.days[4].temp;
        four_text.textContent = data.days[4].description;
        four_icon.src = getIcon(data.days[4].icon);
        four_date.textContent = data.days[4].datetime;

        // Day 5 Forecast
        five_temp.textContent = data.days[5].temp;
        five_text.textContent = data.days[5].description;
        five_icon.src = getIcon(data.days[5].icon);
        five_date.textContent = data.days[5].datetime;

        // Update unit labels
        units.forEach((unit) => {
            unit.textContent = "°F";
        });
    }
}


function getIcon(data) {
    const clear_day = "./icons/clear-day.svg";
    const clear_night = "./icons/clear-night.svg";
    const partly_cloudy_day = "./icons/partly-cloudy-day.svg";
    const partly_cloudy_night = "./icons/partly-cloudy-night.svg";
    const rain = "./icons/rain.svg";
    const snow = "./icons/snow.svg";
    const wind = "./icons/wind.svg";
    const fog = "./icons/fog.svg";
    const cloudy = "./icons/cloudy.svg";
    if (data === "clear-day") {
        return clear_day;
    } else if (data === "clear-night") {
        return clear_night;
    } else if (data === "partly-cloudy-day") {
        return partly_cloudy_day;
    } else if (data === "partly-cloudy-night") {
        return partly_cloudy_night;
    } else if (data === "rain") {
        return rain;
    } else if (data === "snow") {
        return snow;
    } else if (data === "wind") {
        return wind;
    } else if (data === "fog") {
        return fog;
    } else if (data === "cloudy") {
        return cloudy;
    } else {
        return "";
    }
}

function celsiusToFahrenheit(data, element) {
    element.textContent=data;
}

function fahrenheitToCelsius(temp, element) {
    tempNew = parseFloat((parseFloat(temp)-32)/(9/5)).toFixed(1);
    element.textContent=tempNew;
}

function changeUnit(unit) {
    let units = document.querySelectorAll(".unit");
    if (unit==="C") {
        units.forEach((unit) => {
            unit.textContent = "°C";
        });
    } else {
        units.forEach((unit) => {
            unit.textContent = "°F";
        });
    }
}

document.addEventListener('DOMContentLoaded', async() => {
    let initialData = await getWeather("Hannover");
    if (initialData !== "Error") {
        populateHtml(initialData);
    }
    const submitButton = document.querySelector(".submit");
    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let location = document.querySelector('input[name="location"]').value;
        if (!location) {
            return; // Exit the function to prevent submission
        }   
        const data = await getWeather(location); 
        if (data != "Error") {
            populateHtml(data);
        } else {
            const todayText = document.querySelector("#text").textContent;
            todayText.textContent = "Error!";
        }
    })
    const unitButton = document.querySelector(".unitToggle");
    unitButton.addEventListener("click", async (e) => {
        e.preventDefault();

        let unit = unitButton.textContent;
        let maxtemptoday = document.querySelector(".today > .left > #info > #maxtemp > .temp");
        let mintemptoday = document.querySelector(".today > .left > #info > #mintemp> .temp");
        let tempnow = document.querySelector(".today > .right > #temp> .temp");

        let city = document.querySelector("#city");
        let data = await getWeather(city.textContent);
        let maxtemptodaydata = data.days[0].tempmax;
        let mintemptodaydata = data.days[0].tempmin;
        let tempnowdata = data.days[0].temp;
        if (unit === "Celsius") {
            celsiusToFahrenheit(tempnowdata,tempnow);
            celsiusToFahrenheit(mintemptodaydata,mintemptoday);
            celsiusToFahrenheit(maxtemptodaydata,maxtemptoday);
            changeUnit("C");
            unitButton.textContent = "Fahrenheit";
        } else {
            fahrenheitToCelsius(tempnowdata,tempnow);
            fahrenheitToCelsius(mintemptodaydata,mintemptoday);
            fahrenheitToCelsius(maxtemptodaydata,maxtemptoday);
            changeUnit("F");
            unitButton.textContent = "Celsius";
        }
    })
})

