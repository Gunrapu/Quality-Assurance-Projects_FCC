const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

    // #1
    test('convertHandler should correctly read a whole number input', function (done) {
        let input = '32L';
        assert.equal(convertHandler.getNum(input), 32);
        done();
    });

    // #2
    test('convertHandler should correctly read a decimal number input', function (done) {
        let input = '3.1mi';
        assert.equal(convertHandler.getNum(input), 3.1);
        done();
    });

    // #3
    test('convertHandler should correctly read a fractional input', function (done) {
        let input = '1/2km';
        assert.equal(convertHandler.getNum(input), 0.5);
        done();
    });

    // #4
    test('convertHandler should correctly read a fractional input with a decimal', function (done) {
        let input = '5.4/3lbs';
        assert.equal(convertHandler.getNum(input), 1.8);
        done();
    });

    // #5
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function (done) {
        let input = '3/2/3kg';
        assert.equal(convertHandler.getNum(input), 'invalid number');
        done();
    });

    // #6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function (done) {
        let input = 'kg';
        assert.equal(convertHandler.getNum(input), 1);
        done();
    });

    // #7
    test('convertHandler should return the correct return unit for each valid input unit', function (done) {
        let input = '32gAl';
        assert.equal(convertHandler.getUnit(input), 'gal');
        done();
    });

    // #8
    test('convertHandler should correctly return an error for an invalid input unit', function(done) {
        let input = '32g';
        assert.equal(convertHandler.getUnit(input), 'invalid unit');
        done();
    });

    // #9
    test('convertHandler should return the correct return unit for each valid input unit', function(done) {
        let input = 'gal';
        let expected = 'L';
        assert.equal(convertHandler.getReturnUnit(input), expected);
        done();
    });

    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(done) {
        let input = 'gal';
        let expected = 'gallons';
        assert.equal(convertHandler.spellOutUnit(input), expected);
        done();
    });
    
    // #11
    test('convertHandler should correctly convert gal to L', function(done) {
        let input = [5, 'gal'];
        let expected = 18.92705;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });
    
    // #12
    test('convertHandler should correctly convert L to gal', function(done) {
        let input = [5, 'L'];
        let expected = 1.32086;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });
    
    // #13
    test('convertHandler should correctly convert mi to km', function(done) {
        let input = [3.1, 'mi'];
        let expected = 4.98895;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });

    // #14
    test('convertHandler should correctly convert km to mi', function(done) {
        let input = [5, 'km'];
        let expected = 3.10686;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });
    
    // #15
    test('convertHandler should correctly convert lbs to kg', function(done) {
        let input = [10, 'lbs'];
        let expected = 4.53592;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });

    // #16
    test('convertHandler should correctly convert kg to lbs', function(done) {
        let input = [5, 'kg'];
        let expected = 11.0231;
        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });

});