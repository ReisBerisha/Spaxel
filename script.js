const form = document.getElementById('weather-form');
const input = document.getElementById('city-input');
const result = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const icon = document.getElementById('weather-icon');

// ✅ New API key
const API_KEY = 'a307cf447f5cc3dc11a9f01c4566b45d';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      throw new Error(data.message || "City not found");
    }

    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;
    temperature.textContent = `${data.main.temp}°C`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;

    result.classList.remove('hidden');
  } catch (err) {
    alert("Error: " + err.message);
    result.classList.add('hidden');
  }

  input.value = '';
});
