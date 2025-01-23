**Curi : DNS-Based Query Resolution Tool**

Project Overview
This project implements a DNS-based query resolution tool that responds to TXT queries for various commands, such as weather information and general knowledge. 
It leverages Gemini for natural language processing and a weather API to fetch real-time weather data. The server operates on the DNS protocol, providing efficient and scalable query handling.
The inspiration is from dns toys built by Dr K (CTO of Zerodha).


**Features**

Weather Query: Fetch real-time weather information for any location.
Generative AI Integration: Respond to general knowledge or other text-based queries using Google Generative AI (Gemini model).
DNS Server: Operates as a UDP-based DNS server, resolving TXT-type queries.
Custom Query Parsing: Intelligently parses commands like weather <location> or free-form queries for AI responses.

**Technologies Used**

Node.js: Backend server implementation.
denamed: DNS server framework for handling UDP DNS queries.
Google Generative AI: Natural language processing.
Weather API: Real-time weather data integration.
dotenv: Environment variable management for secure API keys

**Future Enhancements**

Add support for more query types (e.g., currency exchange, time zones).
Improve response accuracy and expand AI capabilities.
Integrate Secret Manager to handle API keys securely.
Explore containerization with Docker for easier deployment.
