// config/cors.js
const corsOptions = {
    origin: 'http://example.com', // Replace with your client URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include cookies in CORS requests
};

module.exports = corsOptions;
