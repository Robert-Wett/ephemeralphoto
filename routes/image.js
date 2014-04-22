var CronJob     = require('cron').CronJob;
var moment      = require('moment');
var util        = require('util');
var fs          = require('fs');
var contentPath = require('../config').contentPath;
var uuid        = require('node-uuid');
var _           = require('underscore');

var usedFileNames = [];

/**
 * [createNewExpiryJob description]
 * @param  {[Object]} date When to expire/delete the image.
 *                    Default to current timestamp + 10 hours.
 * @param  {[String]} id 
 */
function createNewExpiryJob(date, id) {
  date = date || moment().add('hours', 10);

  var expireJob = new CronJob(date, deleteImage(id));
}

/**
 * [deleteImage description]
 * @param  {[type]} imgId [description]
 * @return {[type]}       [description]
 */
function deleteImage(imgId) {
  // If nothing passed, return
  if (!imgId) return;

  var filepath = contentPath + imgId;
  fs.unlink(filepath, function(err) {
    if (err) {
      var errString = 'Error - unable to unlink file with id "%s", with path "%s"';
      console.log(util.format(errString, imgId, filePath));
    } else {
      usedFileNames.push(imgId);
      // Possibly get some stats on the files first - like how long it existed, what type it was, size, etc..
      if (process.env.dev == 'development') {
        console.log('Successfully deleted file "%s" at "%d"', imgId, moment.now());
      }
    }
  });
}

function uploadFile(file) {
  var fileSuffix = getGuid();
  var filePath   = contentPath + fileSuffix;

  fs.link(filePath, function(err) {
    if (err) {
      var errString = 'Error - unable to link file with id "%s", with path "%s"';
      console.log(util.format(errString, fileSuffix, filePath));
    } else {
       if (process.env.dev == 'development') {
        console.log('Successfully uploaded file "%s" at "%d"', filePath, moment.now());
      }
    }
  });
}

/**
 * Get a guaranteed unique id checked against `usedFileNames`
 * @return {[String]} A unique identifier
 */
function getGuid() {
  var guid =  uuid.v1();
  if (_.contains(usedFileNames, guid)) {
    getGuid();
  }
  return guid;
}

exports.deleteImage = deleteImage;
exports.createJob   = createNewExpiryJob;