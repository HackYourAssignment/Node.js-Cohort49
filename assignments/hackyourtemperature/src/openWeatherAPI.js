import fetch from 'node-fetch';

export async function getCurrentWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

    const data = await fetchData(url);

    if (!data.main.temp || !data.weather[0].description || !data.name) {
      throw new Error(`Required data is missing!`);
    }

    return {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
    };
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`HTTP Error! ${response.status}, ${response.statusText}`);

  const data = await response.json();
  if (!data) throw new Error(`Empty response!`);

  return data;
}
