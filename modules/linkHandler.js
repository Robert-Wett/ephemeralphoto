/**
 * This is a node/js implementation of: https://gist.github.com/bhelx/778542
 */
var _ = require('underscore');


function Const() {}
Const.BASE             = 62;
Const.UPPERCASE_OFFSET = 55;
Const.LOWERCASE_OFFSET = 61;
Const.DIGIT_OFFSET     = 48;
Const.BANK             = {};


var BANKArray = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split("");
_.map(BANKArray, function(char, idx) {
  Const.BANK[char] = idx;
});

/**
 * Turns a digit [char] in character representation
 * from the number system with base [BASE] into a Number
 */
function trueOrd(char) {
  if (typeof char == Number) {
    return Const.BANK[char] - Const.DIGIT_OFFSET;
  }
  else if (Const.BANK['A'] <= Const.BANK[char] <= Const.BANK['Z']) {
    return Const.BANK[char] - Const.UPPERCASE_OFFSET;
  }
  else if (Const.BANK['a'] <= Const.BANK[char] <= Const.BANK['z']) {
    return Const.BANK[char] - Const.LOWERCASE_OFFSET;
  }
  else {
    // RaiseExceptionErrorHereAndStuffs
  }
}

/**
 * Turns a `Number` into digit in `Const.BASE` as
 * a character (String) representation
 */
function trueChr(number) {
  if (number < 10) {
    return String.charCodeAt(number + Const.DIGIT_OFFSET);
  }
  else if (10 <= number <= 35) {
    return String.charCodeAt(number + Const.UPPERCASE_OFFSET);
  }
  else if (36 <= number <= 62) {
    return String.charCodeAt(number + Const.LOWERCASE_OFFSET);
  }
  else {
    // Raise some error
  }
}

/**
 * Turn the base `BASE` number `key` into a `Number`
 */
function saturate(key) {
  var intSum = 0;

  if (key.length == 0) return;

  key = key.split("").reverse().join("");
  _.each(key, function(char, idx) {
    intSum += trueOrd(char) * Math.pow(Const.BASE, idx);
  });

  return intSum;
}

/**
 * Turn a `Number` into a base `Const.BASE` number
 * in `String` representation
 */
function dehydrate(number) {
  var str = '';
  var remainder;

  if (typeof number != Number) {
    // Raise error
  }
  if (number == 0) return '0';

  while (number > 0) {
    remainder = number % Const.BASE;
    str = trueChr(number) + str;
    number = number / Const.BASE;
  }

  return str;
}

exports.saturate  = saturate;
exports.dehydrate = dehydrate;