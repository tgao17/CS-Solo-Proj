const appRoot = require('app-root-path');
const path = require('path');
const paths = require(appRoot.path + '/paths');

const User = require(path.join(paths.models, 'userModel'));

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    await User.create(req.body);
    res.locals.username = username;
    console.log('Created a New User');
    return next();
  } catch (err) {
    return next('createUser error');
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username, password: password });
  if (user === null) {
    // some redirect to sign up
    return next('User not Verified');
  }
  console.log('User Verified');
  return next();
};

module.exports = userController;
