/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , http    = require('http')
  , path    = require('path')
  , config  = require('config');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// http://goo.gl/XTvmi0
// Limit filesizes to 5mb. This should take care of almost
// all images, and cut down on people abusing the service to
// host larger files. 
app.use(express.limit(config.maxSize));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',      routes.index);
app.get('/image', routes.image);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});