const express = require('express');
const appRoot = require('app-root-path');
const path = require('path');
const paths = require(appRoot.path + '/paths');

const mapController = require(path.join(paths.controller, 'mapController'));

const router = express.Router();
router.get('/', mapController.getMarkers, (req, res) => {
  console.log('fetch markers');
  return res.status(200).json(res.body);
});

router.patch('/add', mapController.createMarker, (req, res) => {
  console.log('added');
  return res.status(200).json(res.body);
});
module.exports = router;
