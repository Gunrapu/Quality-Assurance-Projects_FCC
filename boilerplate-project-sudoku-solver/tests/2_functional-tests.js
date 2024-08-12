const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

    // #1 Solve a puzzle with valid puzzle string: POST request to /api/solve
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function (done) {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'solution');
                assert.strictEqual(res.body.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
                done();
            });
    });

    // #2 Solve a puzzle with missing puzzle string: POST request to /api/solve
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
        chai.request(server)
            .post('/api/solve')
            .send({})
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.strictEqual(res.body.error, 'Required field missing')
                done();
            })
    });

    // #3 Solve a puzzle with invalid characters: POST request to /api/solve
    test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '1.5..2.84..63.12.7.2..5..Z..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
            .end(function(err, res) {
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, 'error')
                assert.strictEqual(res.body.error, 'Invalid characters in puzzle')
                done();
            })
    });

    // #4 Solve a puzzle with incorrect length: POST request to /api/solve
    test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '1.5..2.84..63.12.7.2..5....1....8.2.3674.3.7.2..9.47...8..1..16....926914.37' }) // 80 chars
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body);
                assert.property(res.body, 'error');
                assert.strictEqual(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
    });
    
    // #5 Solve a puzzle that cannot be solved: POST request to /api/solve
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', function (done) {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '5..3..2..1..4..6..7..8..9..1..2..3..4..5..6..7..8..9..1..2..3..4..5..6..7..8..9..' })
            .end(function(err, res) {
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, 'error')
                assert.strictEqual(res.body.error, 'Puzzle cannot be solved')
                done();
            })
    });
    
    // #6 Check a puzzle placement with all fields: POST request to /api/check
    test('Check a puzzle placement with all fields /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', coordinate: 'A2', value: '3'})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, true);
          done();
        })
      });
    

    // #7 Check a puzzle placement with single placement conflict: POST request to /api/check
    test('Check a puzzle with single placement conflict /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', coordinate: 'A2', value: '4'})
        .end(function(err, res) {
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict[0], 'row');
          done();
        })
    });

    // #8 Check a puzzle placement with multiple placement conflicts: POST request to /api/check
    test('Check a puzzle with multiple placement conflicts /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', coordinate: 'F7', value: '2'})
        .end(function(err, res) {
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict[0], 'row');
          assert.equal(res.body.conflict[1], 'column');
          done();
        })
    });

    // #9 Check a puzzle placement with all placement conflicts: POST request to /api/check
    test('Check a puzzle with all placement conflicts /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', coordinate: 'C1', value: '2'})
        .end(function(err, res) {
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict[0], 'row');
          assert.equal(res.body.conflict[1], 'column');
          assert.equal(res.body.conflict[2], 'region');
          done();
        })
    });

    // #10 Check a puzzle placement with missing required fields: POST request to /api/check
    test('Check a puzzle placement with missing required fields /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', coordinate: 'A2'})
        .end(function(err, res) {
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        })
    });

    // #11 Check a puzzle placement with invalid characters: POST request to /api/check
    test('Check a puzzle placement with invalid characters /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: '1.5..2.84..63.12.7.2..5+....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', coordinate: 'A2', value: '3'})
        .end(function(err, res) {
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        })
    });

    // #12 Check a puzzle placement with incorrect length: POST request to /api/check
    test('Check a puzzle placement with incorrect length /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3', coordinate: 'A2', value: '3'})
        .end(function(err, res) {
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
          done();
        })
    });

    // #13 Check a puzzle placement with invalid placement coordinate: POST request to /api/check
    test('Check a puzzle placement with invalid placement coordinate /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', coordinate: 'J2', value: '3'})
        .end(function(err, res) {
          assert.equal(res.body.error, "Invalid coordinate");
          done();
        })
    });

    // #14 Check a puzzle placement with invalid placement value: POST request to /api/check
    test('Check a puzzle placement with invalid placement value /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', coordinate: 'A2', value: '3P'})
        .end(function(err, res) {
          assert.equal(res.body.error, 'Invalid value');
          done();
        })
    });

});

