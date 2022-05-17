const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
// const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;

// Connect to db
connectDB();

// INITIALIZE APP
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ROUTES

// SERVE FRONTEND
// if(process.env.NODE_ENV === 'production') {
// 	// set build folder as static
// 	app.use(express.static(path.join(__dirname, '../frontend/build')));

// 	app.get('*', (_, res) => res.sendFile(path.jon(__dirname, '../', 'frontend', 'build', 'index.html')));
// } else {
// 	app.get('/', (req, res) => {
// 		res.status(200).json({message: 'Welcome to the Ticket System API'});
// 	});
// }

// MORE MIDDLEWARE
// app.use(errorHandler);

// SERVER
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));