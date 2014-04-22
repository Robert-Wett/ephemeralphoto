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
    var file = req.params.file;
    var img = fs.readFileSync(__dirname + "/uploads/" + file);
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
        var newPath = __dirname + "/uploads/" + imageName;
        /// write file to uploads/fullsize folder
        fs.writeFile(newPath, data, function (err) {
          /// redirect to the image just uploaded
          res.redirect("/uploads/" + imageName);
        });
    });
  },
  
  expireImage: function(req, res) {

  }
  
}
