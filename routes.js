var main  = require('./routes/index');
var image = require('./routes/image');


module.exports = function(app) {

  app.get('/',                 main.index);

  app.get('/v2',               main.v2);

  app.get('/image/:id',        image.showImage);

  app.post('/image',           image.postImage);

};