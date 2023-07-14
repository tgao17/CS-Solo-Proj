const express = require('express');
const cookieParser = require('cookie-parser');
const appRoot = require('app-root-path');
const path = require('path');
const paths = require(appRoot.path + '/paths');

const User = require(path.join(paths.models, 'userModel'));

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const randomNum = Math.floor(Math.random() * (99 - 0));
  res.cookie('secret', randomNum);
  return next();
};

//FOR LOGGIN IN
cookieController.setSSIDCookie = async (req, res, next) => {
  // COOKIE NOT SHOWING UP,
  const { _id } = await User.findOne({ username: req.body.username });
  if (!_id) return next('User not found');

  console.log('ID found!: ', _id.toString());
  res.cookie('ssid', _id.toString()); // { httpOnly: true }
  console.log('Created ssid Cookie');
  return next();
};

module.exports = cookieController;

//64aeedf798909f260cd63f4b for tony8
