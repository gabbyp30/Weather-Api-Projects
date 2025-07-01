const findMe = () => {
  const success = async (position) => {
    const { latitude, longitude } = position.coords;

    // Step 2: Get the Weather Office & Grid Points
    const pointsUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
    try {
      const pointsRes = await fetch(pointsUrl);
      const pointsData = await pointsRes.json();
      const forecastUrl = pointsData.properties.forecast;

      // Step 3: Fetch 7-Day Forecast
      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();

      displayForecast(forecastData.properties.periods);
    } catch (err) {
      console.error("Weather API error:", err);
    }
  };

  const error = () => {
    console.error("Unable to retrieve location.");
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

const displayForecast = (periods) => {
  const container = document.getElementById("forecast-container");
  container.innerHTML = "";

  periods.forEach((period) => {
    const card = document.createElement("div");
    card.className = "card m-2 p-3";

    card.innerHTML = `
      <h5>${period.name}</h5>
      <img src="${period.icon}" alt="${period.shortForecast}" />
      <p>${period.temperature}°${period.temperatureUnit}</p>
      <p>${period.shortForecast}</p>
    `;

    container.appendChild(card);
  });
};

