async function getWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=7HLBA6BCS4PDD2RNMW2FY68XV`);
        const data = await response.json();
        return data;
    }
    catch(error) {
       return "Error";
    }
}

function populateHtml(data) {
    
}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector(".submit");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        let location = document.querySelector('input[name="title"]').value;
        if (!location) {
            return; // Exit the function to prevent submission
        }   
        let data = getWeather(location); 
        if (data != "Error") {
            populateHtml(data);
        }
    })
})