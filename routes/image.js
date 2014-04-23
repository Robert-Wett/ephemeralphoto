var CronJob     = require('cron').CronJob;
var moment      = require('moment');
var util        = require('util');
var fs          = require('fs');
var config      = require('../config');
var uuid        = require('node-uuid');
var _           = require('underscore');

var usedFileNames = [];
var fileLookup    = {};
var contentPath   = config.projectDir + '/uploads/';
var inDev         = process.env.dev === 'development';

/**
 * [createNewExpiryJob description]
 * @param  {[Object]} date When to expire/delete the image.
 *                    Default to current timestamp + 10 hours.
 * @param  {[String]} id 
 */
function createNewExpiryJob(id, date) {
  if (!date) {
    if (inDev)
      date = moment().add(config.testTtl);
    else 
      date = moment().add(config.defaultTtl);
  }

  // Add the file to the queue of things to watch.
  fileLookup[id] = date;
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
  var outputString;

  fs.unlink(filepath, function(err) {
    if (err) {
      outputString = 'Error - unable to unlink file with id "%s", with path "%s"';
      console.log(util.format(outputString, imgId, filePath));
    } else {
      usedFileNames.splice(usedFileNames.indexOf(imgId), 1);
      // Possibly get some stats on the files first - like how long
      // it existed, what type it was, size, etc..
      if (inDev) {
        outputString = 'Successfully deleted file "%s" at "%d"';
        console.log(util.format(outputString, imgId, moment.now()));
      }
    }
  });
}

function uploadWatcher() {
  var currentTime = moment();
  _.map(fileLookup, function(date, fileName) {
    if (date < currentTime) {
      deleteImage(fileName);
    }
  })
}

/**
 * Get a guaranteed unique id checked against `usedFileNames`
 * @return {[String]} A unique identifier
 */
function getGuid() {
  var guid =  uuid.v1();
  if (_.contains(usedFileNames, guid)) {
    return getGuid();
  }

  usedFileNames.push(guid);
  return guid;
}

module.exports = {
  showImage: function(req, res) {
    var fileName = req.params.id;
    var img = fs.readFileSync(contentPath + fileName);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  },

  postImage: function(req, res) {
    fs.readFile(req.files.image.path, function (err, data) {
      var imageName = req.files.image.name

      if (!imageName) {
        console.log("There was an error")
        res.redirect("/");
        res.end();
      }
      else {
        fs.writeFile(contentPath + imageName, data, function (err) {
          // Queue the Cron-Job for deletion
          createNewExpiryJob(imageName);
          /// redirect to the image just uploaded
          res.redirect("/image/" + imageName);
        });
      }
    });
  },
  
  expireImage: function(req, res) {

  }
  
}
