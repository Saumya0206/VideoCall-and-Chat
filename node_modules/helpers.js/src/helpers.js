/**
 * @param  {Object} - value, the parameter to check if it is a object
 * @return {Boolean} - whether or not the parameter is an object
 */
function isObject(value) {
  return value !== null && typeof value === 'object';
};

/**
 * Contains a < ie9 polyfill.
 * @param  {Array} - value, the parameter to check if it is a Array
 * @return {Boolean} - whether or not the parameter is an array
 */
function isArray(value) {

  if(!Array.isArray) {
    return value !== null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
  } else {
    return value !== null && typeof value === 'object' && Array.isArray(value);
  }

};


/**
 * For those projects that want < ie9 support.
 * Mainly an ie8 polyfill as ie8 doesnt support Array.prototype.indexOf
 * @param  {Array} arr, the array to search on
 * @param  {String|Integer} search, the value to search for
 * @return {Integer}, the index of the found element
 */
function arrayIndex(arr, search){

  if(!Array.prototype.indexOf) {

    for(var i = 0, ii = arr.length; i < ii; i++){
      if(arr[i] === search) {
        return i;
      }
    }

    return -1;

  } else {
    return arr.indexOf(search);
  }

};

/**
 * @param  {Object} - obj, the object to check for keys
 * @return {Array} - The keys from the Object
 */
function keys(obj){

  if(!Object.keys){
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  } else {
    return Object.keys(obj);
  }

};

/*
 * The full function for extending an
 * array of objects into a new object,
 * can be optionally deep which will
 * recursively go through properties.
 *
 * @param {Object} - dest, the new object to write to
 * @param {Array} - objs, the array of objects to extend
 * @param {Boolean} - deep, decides if copy should be recursive
 * @return {Object} - the new written object
*/
function fullExtend(dest, objs, deep) {
  for (var i = 0, ii = objs.length; i < ii; i++) {
    var obj = objs[i];

    if (!isObject(obj)) throw new Error('\'obj\' needs to be an Array or Object.');

    var objKeys = keys(obj);

    for (var j = 0, jj = objKeys.length; j < jj; j++) {
      var key = objKeys[j];
      var val = obj[key];

      if (isObject(val) && deep) {
        if (!isObject(dest[key])) dest[key] = isArray(val) ? [] : {};
        fullExtend(dest[key], [val], true);
      } else {
        dest[key] = val;
      }
    }
  }

  return dest;
};

/**
 * Low extend of the object i.e. not recursive copy
 *
 * @param  {Object} - dest, the object that will have properties copied to it
 * @param  {Object} - val, the second object with the properties to copy
 * @return {Object} - the new object with properties copied to it
 */
function lowCopy(dest, val) {
  return fullExtend(dest, [val], false);
};

/**
 * Deep extend the object i.e. recursive copy
 *
 * @param  {Object} - dest, the object that will have properties copied to it
 * @param  {Object} - val, the second object with the properties to copy
 * @return {Object} - the new object with properties copied to it
 */
function deepCopy(dest, val){
  return fullExtend(dest, [val], true);
};


module.exports = {
  deepCopy,
  lowCopy,
  isObject,
  isArray,
  keys,
  arrayIndex
}