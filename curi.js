import { startUdpServer, createResponse, createTxtAnswer } from 'denamed';
import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { weather } from './services/weather.js';

config();

if (!process.env.GOOGLE_API_KEY || !process.env.WEATHER_API_KEY) {
  console.error('Missing API keys in .env file');
  process.exit(1);
}

// AI model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

const handleQuery = async (query) => {
  
  const cleanQuery = query.toLowerCase().trim();
  const [command, ...parts] = cleanQuery.split(' ');

  // Weather queries
  if (command === 'weather') {
    const location = parts.join(' ').trim();
    if (!location) return 'Please specify a location';

    const data = await weather(location);
    return `${location}: ${data.temperature.toFixed(1)} degree C, Rain: ${data.precipitation}mm`;
  }

  // General queries
  const result = await model.generateContent(cleanQuery);
  return result.response.text().substring(0, 250);
};

    // DNS server setup
    startUdpServer(async (query) => {
    
    const questions = query.questions;
    if (!questions || questions.length === 0) return createResponse(query, []);
    
    const question = questions[0];
    if (question.type !== 'TXT') return createResponse(query, []);
    
    const answerText = await handleQuery(question.name);
    
    // Create DNS response
    return createResponse(query, [
        createTxtAnswer(question, answerText)
    ]);
  }, {
    port: 53,
    host: '0.0.0.0'
  });
  
  console.log('DNS server running on port 53');