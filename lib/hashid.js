'use strict';

/**
 * The default alphabet is 25 numbers and lowercase letters.
 * Any numbers that look like letters and vice versa are removed:
 * 1 l, 0 o.
 * Also the following letters are not present, to prevent any
 * expletives: cfhistu
 */
var ALPHABET =
  '23456789abdegjkmnpqrvwxyz';

var ALPHABET_LENGTH = ALPHABET.length;

// Governs the length of the ID.
// With an alphabet of 25 chars,
// a length of 8 gives us 25^8 or
// 152,587,890,625 possibilities.
// Should be enough...
var ID_LENGTH = 6;

/**
 * Governs the number of times we should try to find
 * a unique value before giving up.
 * @type {Number}
 */
var UNIQUE_RETRIES = 9999;

var HashID = {};

/**
 * Returns a randomly-generated friendly ID.
 * Note that the friendly ID is not guaranteed to be
 * unique to any other ID generated by this same method,
 * so it is up to you to check for uniqueness.
 * @return {String} friendly ID.
 */
HashID.generate = function () {
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET_LENGTH));
  }

  return rtn;
};

/**
 * Tries to generate a unique ID that is not defined in the
 * `previous` array.
 * @param  {Array} previous The list of previous ids to avoid.
 * @return {String} A unique ID, or `null` if one could not be generated.
 */
HashID.generateUnique = function (previous) {
  previous = previous || [];
  var retries = 0;
  var id;

  // Try to generate a unique ID,
  // i.e. one that isn't in the previous.
  while (!id && retries < UNIQUE_RETRIES) {
    id = HashID.generate();
    if (previous.indexOf(id) !== -1) {
      id = null;
      retries++;
    }
  }

  return id;
};

module.exports = HashID;
