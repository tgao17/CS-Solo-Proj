const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const appRoot = require('app-root-path');
const path = require('path');
const paths = require(appRoot.path + '/paths');

const app = express();

const PORT = 3000;

// routers
const signupRouter = require(path.resolve(paths.router, 'signup'));
const loginRouter = require(path.resolve(paths.router, 'login'));
const mapRouter = require(path.resolve(paths.router, 'map'));

const cookieController = require(path.join(
  paths.controller,
  'cookieController.js'
));

//mongoose connect
const mongoURI =
  'mongodb+srv://tgao17:qscxzsert123@soloproject.vvvugbu.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI);

//parsing chunks
app.use(express.urlencoded());
app.use(express.json());

app.use(cookieParser());

// create an url path prefix for our static files
app.use('/static', express.static(path.resolve(paths.client, 'client')));

app.get(
  '/',
  cookieController.setCookie,
  //data
  (req, res) => {
    console.log('test');
    return res.sendStatus(200);
  }
);

// router to handle main app
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/map', mapRouter);

// add error handler later

//  listening
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
