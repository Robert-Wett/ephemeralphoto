var CronJob     = require('cron').CronJob;
var moment      = require('moment');
var util        = require('util');
var fs          = require('fs');
var contentPath = require('../config').contentPath;


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
      console.log(util.format('Error - unable to unlink file with id "%s", with path "%s"', imgId, filepath));
    } else {
      usedFileNames.push(imgId);
      // Possibly get some stats on the files first - like how long it existed, what type it was, size, etc..
      if (process.env.dev === 'development') {
        console.log('Successfully deleted file "%s" at "%d"', imgId, moment.now());
      }
    }
  });
}

exports.list = function(req, res){
  res.send("respond with a resource");
};