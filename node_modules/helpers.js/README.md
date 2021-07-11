Helpers.js
==

[![Build Status](https://travis-ci.org/danjford/helpersjs.svg?branch=master)](https://travis-ci.org/danjford/helpersjs)
[![codecov.io](https://codecov.io/github/danjford/helpersjs/coverage.svg?branch=master)](https://codecov.io/github/danjford/helpersjs?branch=master)

### About

These are functions in Vanilla js that I find useful and that I regularly use, so I'm putting them here as they may be useful to others as well. Some of these are just simple polyfills such as isArray which should be moved into their own file e.g. src/polyfills.js so that they can be optionally included.

### Helpers

##### fullExtend

You may have experienced where sometimes you may want to have two copies of an Object, but changing one will also change the other. This function will make it so that will not happen and also provides an easy way of copying / merging an Array of multiple values into a new Object or Array.

 * @param {Object|Array} - the new object to write to
 * @param {Array} - the array of values to extend
 * @param {Boolean} - deep, decides if copy should be recursive

##### lowCopy

This is a lighter version of fullExtend, it will only remove the references from the top level of an Object. So if you don't have a deeply nested Object then this is probably for you.

 * @param  {Object|Array} - the object that will have properties copied to it
 * @param  {Object|Array} - the object with the properties to copy

##### deepCopy

This is also a lighter version of fullExtend, however this one will recurse over all of the properties so that all of the references to the old object can be removed.

 * @param  {Object} the object that will have properties copied to it
 * @param  {Object} the object with the properties to copy

##### isObject

This is a way of checking if a variable is of type 'object'. Keep in mind that an Array is also of type object. This may change in the future if people want a way to distinguish an Object from an Array with this function.

 * @param  {Object} - he parameter to check if it is a object
 * @return {Boolean} - whether or not the parameter is an object

### Polyfills

##### isArray

This is a polyfill of Array.isArray so that it can be used in < ie 9.

 * @param  {Array} - the parameter to check if it is a Array
 * @return {Boolean} - whether or not the parameter is an array

##### arrayIndex

A polyfill for < ie 9 for Array.prototype.indexOf.

 * @param  {Array}, the array to search on
 * @param  {String|Integer}, the value to search for
 * @return {Integer}, the index of the found element

##### keys

A polyfill for Object.keys.

 * @param  {Object} - the object to check for keys
 * @return {Array} - The keys from the Object

### Contributing

This could become a very nice library of simple solutions in Vanilla JS to common problems. So if you have any well written functions that you use often, create an issue detailing the Use Case and proposed solution and then a pull request referencing that issue.

If you see any improvements that can be made to the project so far, create an issue for it!

### Documentation

For documentation I am using the sublime docs plugin, so if you are going to contribute I would appreciate if you could use something similar.

### Tests and Coverage

Tests are written in [Mocha](https://mochajs.org/) and the coverage is generated using [Istanbul](https://github.com/gotwarlost/istanbul). Each piece of new functionality will require a test to cover all of its use cases.

### Developing and Building

At the moment the project is using the Task Runner Grunt to build the projects.
- Running `grunt` will get you the 'developing' version which will carry out all of the tasks and then being watching the project for any changes.
- Running `grunt build` will carry out all of the tasks and then generate a unminified and minified version of the project in the `dist` folder. **This will need to be done before any pull requests can be merged into upstream.**

### Browser Support

To provide Browser support, I am using Babel and Browserify. Additionally to this, I would ideally like this to be able to support down to ie 8 but maybe this can be an optional requirement by moving the polyfills into their own file and generating builds such as helpers-ie8.js.


