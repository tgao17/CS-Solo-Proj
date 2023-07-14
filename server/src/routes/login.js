const express = require('express');
const appRoot = require('app-root-path');
const path = require('path');
const paths = require(appRoot.path + '/paths');

const userController = require(path.join(paths.controller, 'userController'));
const sessionController = require(path.join(
  paths.controller,
  'sessionController'
));
const cookieController = require(path.join(
  paths.controller,
  'cookieController.js'
));

const router = express.Router();

router.get('/', (req, res) => {
  console.log('get login');
  return res.sendStatus(200);
});

router.post(
  '/',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  (req, res) => {
    // code
    return res.json({ success: true, redirectUrl: '/map' });
  }
);
// export
module.exports = router;
