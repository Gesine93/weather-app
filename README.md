# Weather App

This is a simple weather application built to provide current weather conditions and forecasts for any city. It uses the **Visual Crossing Weather API** to fetch weather data.

## Features

- Fetch current weather based on city name.
- Display temperature, humidity, and general weather conditions.
- Simple and user-friendly interface.
- Error handling for invalid city names or API issues.

## Technologies Used

- **HTML/CSS/JavaScript**: Frontend development.
- **Visual Crossing Weather API**: For real-time weather data.
- **Fetch API***: To make HTTP requests.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Gesine93/weather-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```

3. Open `index.html` in your browser.

## Usage

- Enter the name of the city in the input field and click "Search" to get the weather details.
- Weather information such as temperature, humidity, and conditions will be displayed.

## API Configuration

To use the app, you will need an API key from [Visual Crossing](https://www.visualcrossing.com/weather-api).

1. Sign up for a free API key.
2. Replace the placeholder API key in the `script.js` file:
   ```javascript
   const apiKey = 'YOUR_API_KEY';
   ```

## Future Improvements

- [ ] Implement location-based weather (using the Geolocation API).
- [ ] Improve UI/UX with animations and icons.

