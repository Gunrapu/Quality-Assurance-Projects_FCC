const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');

let solver = new Solver();

suite('Unit Tests', function() {

    const validInput = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const invalidInputChar = '1.5..2.84..63.12.7.2..5....Z..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const invalidInputLength = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';

    const expectedSolution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

    // #1 : Logic handles a valid puzzle string of 81 characters
    test('Logic handles a valid puzzle string of 81 characters', function (done) {
        assert.strictEqual(solver.validate(validInput).valid, true);
        done();
    });

    // #2 : Logic handles a puzzle string with invalid characters (not 1-9 or .)
    test('Logic handles a puzzle string with invalid characters', function (done) {
        assert.strictEqual(solver.validate(invalidInputChar).valid, false);
        done();
    });

    // #3 : Logic handles a puzzle string that is not 81 characters in length
    test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
        assert.strictEqual(solver.validate(invalidInputLength).valid, false);
        done();
    });

    // #4 : Logic handles a valid row placement
    test('Logic handles a valid row placement', function (done) {
        assert.strictEqual(solver.checkRowPlacement(validInput, 0, 1, '3'), true);
        done();
    });

    // #5 : Logic handles an invalid row placement
    test('Logic handles an invalid row placement', function (done) {
        assert.strictEqual(solver.checkRowPlacement(validInput, 0, 1, '5'), false);
        done();
    });

    // #6 : Logic handles a valid column placement
    test('Logic handles a valid column placement', function (done) {
        assert.strictEqual(solver.checkColPlacement(validInput, 0, 0, '7'), true);
        done();
    });

    // #7 : Logic handles an invalid column placement
    test('Logic handles an invalid column placement', function (done) {
        assert.strictEqual(solver.checkColPlacement(validInput, 0, 1, '2'), false);
        done();
    });

    // #8 : Logic handles a valid region (3x3 grid) placement
    test('Logic handles a valid region (3x3 grid) placement', function (done) {
        assert.strictEqual(solver.checkRegionPlacement(validInput, 0, 1, '7'), true);
        done();
    });

    // #9 : Logic handles an invalid region (3x3 grid) placement
    test('Logic handles an invalid region (3x3 grid) placement', function (done) {
        assert.strictEqual(solver.checkRegionPlacement(validInput, 0, 1, '5'), false);
        done();
    });

    // #10 : Valid puzzle strings pass the solver
    test('Valid puzzle strings pass the solver', function (done) {
        const result = solver.solve(validInput);
        assert.strictEqual(result.success, true);
        assert.strictEqual(result.solution, expectedSolution);
        done();
    });

    // #11 : Invalid puzzle strings fail the solver
    test('Invalid puzzle strings fail the solver', function (done) {
        const invalidResult = solver.solve(invalidInputChar);
        assert.strictEqual(invalidResult.success, false);
        done();
    });

    // #12 : Solver returns the expected solution for an incomplete puzzle
    test('Solver returns the expected solution for an incomplete puzzle', function (done) {
        const result = solver.solve(validInput);
        assert.strictEqual(result.success, true);
        assert.strictEqual(result.solution, expectedSolution);
        done();
      });

});
