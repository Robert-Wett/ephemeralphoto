var redis  = require('redis');
var client = redis.createClient();

var opts = {
  verbose: true
};

var redisCallback = function(error, reply) {
  // Only output this stuff if we are in 'verbose' mode
  // defined in our opts object.
  if (opts.verbose) {
    if (error) {
      console.log(error);
    } else {
      console.log(reply);
    }
  }
};

