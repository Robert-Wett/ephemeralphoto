/**
 * Module dependencies.
 */

var express = require('express');
var http    = require('http');
var path    = require('path');
var config  = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
// http://goo.gl/XTvmi0
// Limit filesizes to 5mb. This should take care of almost
// all images, and cut down on people abusing the service to
// host larger files. 
app.use(express.limit(config.maxSize));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add the routes
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});