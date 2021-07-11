var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  Helper = require('../src/helpers.js');


describe('isArray', function() {

  it('should be recognised as an array', function(){

    assert.isTrue(Helper.isArray([]), 'The variable is not of type Array.');

  });

  it('should not be recognised as an array', function(){

    assert.isFalse(Helper.isArray({}), 'The variable is of type Array.');

  });

});

describe('isObject', function() {

  it('should find the type object for {}.', function() {

    assert.isTrue(Helper.isObject({}), 'The variable is not of type Object.');

  });

  it('should find the type object for [].', function() {

    assert.isTrue(Helper.isObject([]), 'The variable is not of type Object.');

  });

});

describe('arrayIndex', function() {

  var testArray = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  it('should find the index of 4 to be at 5', function() {

    assert(Helper.arrayIndex(testArray, 4) === 5, 'The search variable is not at index 5.');

  });

});

describe('keys', function() {

  var testObject = {one: 1, two: 2, three: 3, four: 4};

  it('should correctly find the keys one, two, three and four', function() {

    assert.deepEqual(Helper.keys(testObject), ['one', 'two', 'three', 'four'], 'The correct keys were not found.');

  });

});


describe('Extend', function() {

  var deepObject;

  beforeEach(function() {

    deepObject =  { one: 1, two: 2, child: { three: 3, four: 4, children: [5, 6, 7, 8] } };

  });

  describe('Without extend', function() {

    it('should be the same value', function() {

      var copiedObject = deepObject;

      copiedObject.one = 5;

      assert.deepEqual(copiedObject, deepObject, 'They are not the same.');

    });

  });

  describe('lowCopy', function() {

    it('should have different top values.', function() {

      var lowCopy = Helper.lowCopy({}, deepObject);

      lowCopy.one = 5;

      assert.notDeepEqual(lowCopy, deepObject, 'The two objects are deep equal.');

    });

    it('should have the same lower values.', function() {

      var lowCopy = Helper.lowCopy({}, deepObject);

      lowCopy.child.four = 5;

      assert.deepEqual(lowCopy, deepObject, 'The two objects are not deep equal.');

    });

  });

  describe('deepCopy', function() {

    it('should have different top values.', function() {

      var deepCopy = Helper.deepCopy({}, deepObject);

      deepCopy.one = 5;

      assert.notDeepEqual(deepCopy, deepObject, 'The two objects are deep equal.');

    });

    it('should have the different lower values.', function() {

      var deepCopy = Helper.deepCopy({}, deepObject);

      deepCopy.child.four = 5;

      assert.notDeepEqual(deepCopy, deepObject, 'The two objects are deep equal.');

    });

  });

  describe('String', function() {

    it('should just throw an error', function() {

      expect(function(){
        Helper.lowCopy({}, 'Test')
      }).to.throw("'obj' needs to be an Array or Object.");

    });

  });

});