import axios from 'axios';
import { config } from 'dotenv';

config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function weather(location) {
  if (!API_KEY) throw new Error('Weather API key not configured');
  if (!location) throw new Error('Location required');

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return {
      temperature: response.data.main.temp,
      precipitation: response.data.rain?.['1h'] || 0
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Location "${location}" not found`);
    }
    throw new Error('Failed to fetch weather data');
  }
}