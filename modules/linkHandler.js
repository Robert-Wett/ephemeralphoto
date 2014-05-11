function Const() {}
Const.BASE             = 62;
Const.UPPERCASE_OFFSET = 55;
Const.LOWERCASE_OFFSET = 61;
Const.DIGIT_OFFSET     = 48;
Const.SEED             = {}
//'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split("");

/**
 * Turns a digit [char] in character representation
 * from the number system with base [BASE] into a Number
 * @param  String char The digit to turn into a char
 * @return Number      The digit representation of the input
 */
function trueOrd(char) {
  if (typeof char == Number) {

  }
  else if (Const.SEED[char])
}