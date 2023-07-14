const express = require('express');
const appRoot = require('app-root-path');
const path = require('path');
const paths = require(appRoot.path + '/paths');

const userController = require(path.join(paths.controller, 'userController'));
const sessionController = require(path.join(
  paths.controller,
  'sessionController'
));
const router = express.Router();

router.get('/', (req, res) => {
  //how can i get react to render this? do we even need this?
  console.log('get signup');
  return res.sendStatus(200);
});

router.post(
  '/',
  userController.createUser,
  sessionController.startSession,
  (req, res) => {
    return res.sendStatus(200);
  }
);

// export
module.exports = router;
