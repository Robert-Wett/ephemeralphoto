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
  var ttlPeriod = data.seconds   || 0                 +
                  ((data.minutes || 0) * 60)          +
                  ((data.hours   || 0) * 60 * 60)     +
                  ((data.days    || 0) * 24 * 60 * 60);

  if (ttlPeriod === 0) {
    // Set to 5 hours
    ttlPeriod = 5 * 60 * 60;
  }


  ttlDate.setSeconds(ttlDate.getSeconds() + ttlPeriod);
  console.log(util.format("Setting the desctruct time of %s to %s seconds", imageId, ttlPeriod));
/*
  ttlDate.setMinutes(ttlDate.getMinutes() + minutes);
  ttlDate.setHours(ttlDate.getHours() + hours);
  ttlDate.setDay(ttlDate.getDay() + days);
*/

  new CronJob(ttlDate, deleteImage(imageId), onJobFinish(imageId), true);

  // Return the Expiration Date for the front-end countdown
  return ttlDate;
}


function deleteImage(imgId) {
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
    var outputString = "Successfully deleted %s at %s";
    console.log(util.format(outputString, fileName, Date.now));
  }
}



module.exports = {

  showImage: function(req, res) {
    var fileName = req.params.id;
    fs.readFile(contentPath + fileName, function(err, img) {
      if (err) next(err);
      res.writeHead(200, {'Content-Type': 'image/jpg' });
      res.end(img, 'binary');
    });
    //var img = fs.readFileSync(contentPath + fileName);
  },

  postImage: function(req, res) {
    console.log(req.body);
    fs.readFile(req.files.image.path, function (err, data) {
      var imageName = req.files.image.name;

      if (!imageName) {
        console.log("There was an error");
        res.redirect("/");
        res.end();
      }
      else {
        fs.writeFile(contentPath + imageName, data, function (err) {
          if (err) next(err);
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

/*
                                   __
  __  ______  __  __________  ____/ /
 / / / / __ \/ / / / ___/ _ \/ __  / 
/ /_/ / / / / /_/ (__  )  __/ /_/ /  
\__,_/_/ /_/\__,_/____/\___/\__,_/   
                                     


function getGuid() {
  var guid =  uuid.v1();
  if (_.contains(usedFileNames, guid)) {
    return getGuid();
  }

  usedFileNames.push(guid);
  return guid;
}

 */