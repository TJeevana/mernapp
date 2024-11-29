 //app.js
 const express = require('express');
 const app = express();
 const errorMiddleware = require('./middlewares/error');
 const halls = require('./routes/halls');
 const events = require('./routes/events');
 const bookingforms = require('./routes/booking');
 const auth = require('./routes/auth');
 const userRoutes = require('./routes/userRoutes');

 const cookieParser = require('cookie-parser');
 const cors = require('cors');

 app.use(express.json());
 app.use(cookieParser());
 
 // Setup CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow sending cookies with the request (if using sessions or tokens)
  }));

 app.use('/api/v1/',halls);
 app.use('/api/v1/',events);
 app.use('/api/v1/',bookingforms);
 app.use('/api/v1/',auth);
 app.use('/api/v1', userRoutes);

 app.use(errorMiddleware);

 module.exports = app;

 //54:51 / 3:24:48