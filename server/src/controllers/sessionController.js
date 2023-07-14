const appRoot = require('app-root-path');
const path = require('path');
const paths = require(appRoot.path + '/paths');

const Session = require(path.join(paths.models, 'sessionModel'));
const User = require(path.join(paths.models, 'userModel'));

const sessionController = {};

// FOR CREATING A NEW SESSION AT LOG IN (as sessions also expire)
sessionController.isLoggedIn = async (req, res, next) => {
  // find session
  try {
    // CHANGE LATER we need to use 'req.cookies.ssid' here but since i have trouble linking let's just use our client id

    const user = await User.findOne({ username: req.body.username });

    const session = await Session.findOne({ cookieId: user._id.toString() });
    if (session !== null) {
      console.log('Existing session found');
      // use this session for our application
      return next();
    } else {
      // create a new session; *** NORMALLY WE USE COOKIE ID ***
      Session.create({ cookieId: user._id });
      console.log('Created a New Session from Log In');
      // use this session for our application
      return next();
    }
  } catch (err) {
    return next('sessionController.isLoggedIn error');
  }
};

// FOR CREATING A NEW SESSION AT SIGNUP
sessionController.startSession = async (req, res, next) => {
  try {
    console.log('in try');
    const user = await User.findOne({ username: res.locals.username });
    console.log(user);
    try {
      await Session.create({ cookieId: user._id });
    } catch (err) {
      return next(err);
    }
    console.log('Created a New Session from Sign Up');
    return next();
  } catch (err) {
    return next('could not find user in startSession');
  }
};

module.exports = sessionController;
