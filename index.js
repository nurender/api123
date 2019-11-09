require('dotenv').config();
const {origin} = require('./app/core/origin');
const express = require('express');
const bodyparser = require('body-parser');
const configs = require('./app/configs');
const logger = require('./app/core/logger');
const database = require('./app/core/database');
const compression = require('compression');
const routes = require('./app/routes');
var mongoose = require('mongoose');
const {responseFormat,formatResponse} = require('./app/middlewares/ResponseFormat');
require('colors');



// Define express app.
const app = express();

// origin Set 
// var cors = require('cors')
// app.use(cors())
// app.options('*', cors());
// // origin.origindata(app)
// var allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'example.com');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

// Connect origin
origin(app)

// app.use('/uploads', express.static('uploads'));
// images show
app.use('/uploads', express.static('uploads'));
// show pdf
app.use('/file', express.static('file'));
// show notes images
app.use('/NotesImages', express.static('NotesImages'));
// Setting server.
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(compression());

// Connect database.
// database.connect('localhost', '27017', 'myNewApp');
const CONNECTION_URL = "mongodb+srv://nurender:nurender@cluster0-fd8yp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL)
// Bind with routes default ('/api')
app.use('/api', routes);

// middlewares
app.use(formatResponse);
app.use(responseFormat);

// Starting app server. 
app.listen(configs.server.port, () => {
    logger.info(`Starting server at ${configs.server.port}`.rainbow);
     });
