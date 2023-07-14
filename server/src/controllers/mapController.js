const appRoot = require('app-root-path');
const path = require('path');
const paths = require(appRoot.path + '/paths');
const User = require(path.join(paths.models, 'userModel'));

const mapController = {};

mapController.getMarkers = async (req, res, next) => {
  const id = req.cookies.ssid;
  try {
    const { markers } = await User.findOne({ _id: id });
    res.body = markers;
    return next();
  } catch (err) {
    return next('Error in mapController.getMarkers');
  }
};

mapController.createMarker = async (req, res, next) => {
  // get session id to access user
  const id = req.cookies.ssid;
  //   console.log('id: ', id);
  // get information from req.body (currently just name and lat/long)
  const { title, lat, lng } = req.body;
  if (title.length == 0) {
    return next();
  }
  const newMarker = {
    title: title,
    address: `${lat} | ${lng}`,
    info: 'Text data from user',
    x: lng,
    y: lat,
  };
  // add a marker to user.markers

  try {
    await User.updateOne({ _id: id }, { $push: { markers: newMarker } });
    console.log('Added Marker');

    const { markers } = await User.findOne({ _id: id });
    res.body = markers;

    return next();
  } catch (err) {
    return next('Error in mapController.createMarker');
  }
};
module.exports = mapController;
