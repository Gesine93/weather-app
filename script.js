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
        const todayText = document.querySelector("#text");
        const maxtemptoday = document.querySelector(".today > .left > #maxtemp");
        const mintemptoday = document.querySelector(".today > .left > #mintemp");
        const iconnow = document.querySelector("#iconnow");
        const timenow = document.querySelector(".today > .right > #time");
        const tempnow = document.querySelector(".today > .right > #temp");

        todayText.textContent = data.days[0].description;
        maxtemptoday.textContent = data.days[0].tempmax;
        mintemptoday.textContent = data.days[0].tempmin;
        timenow.textContent = `${String(data.days[0].datetimeEpoch).slice(0,2)}:${String(data.days[0].datetimeEpoch).slice(2,4)}`;
        tempnow.textContent = data.days[0].temp;
        iconnow.src = getIcon(data.days[0].icon);
    };
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

document.addEventListener('DOMContentLoaded', () => {
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
            todayText = "Error!";
        }
    })
})

