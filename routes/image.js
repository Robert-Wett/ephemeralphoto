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



function queueDeleteJob(data, imageId) {
  // Build the date object to pass into the Cron
  var ttlDate = new Date();
  var seconds = data.seconds     || 0;
  var minutes = data.minutes     || 0;
  var hours   = data.hours       || 5;
  var days    = data.days        || 0;

  ttlDate.setSeconds(ttlDate.getSeconds() + seconds);
  ttlDate.setMinutes(ttlDate.getMinutes() + minutes);
  ttlDate.setHours(ttlDate.getHours() + hours);
  ttlDate.setDay(ttlDate.getDay() + days);

  new CronJob(ttlDate, deleteImage(imageId), onJobFinish(imageId), true);

  // Return the Expiration Date for the front-end countdown
  return ttlDate;
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
    }
  });
}


function onJobFinish(fileName) {
  if (inDev) {
    var outputString = "Successfully deleted %s at %d";
    console.log(util.format(outputString, fileName, Date.now));
  }
};


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
      var imageName = req.files.image.name;

      if (!imageName) {
        console.log("There was an error");
        res.redirect("/");
        res.end();
      }
      else {
        fs.writeFile(contentPath + imageName, data, function (err) {
          var ttlDate = queueDeleteJob(req.body, imageName);
          res.redirect("/image/" + imageName);
          /*
          res.redirect('image', {
            image: imageName,
            date: ttlDate
          });
          */
        });
      }
    });
  }

};
