const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server'); // สมมุติว่า server ของคุณอยู่ใน ../server

chai.use(chaiHttp);

suite('Functional Tests', function() {
  let testBookId;

  // POST /api/books เพื่อเพิ่มหนังสือใหม่
  test('POST /api/books with title', function(done) {
    chai.request(server)
      .post('/api/books')
      .send({ title: 'Test Book' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, '_id', 'Book should contain _id');
        assert.property(res.body, 'title', 'Book should contain title');
        assert.equal(res.body.title, 'Test Book');
        testBookId = res.body._id; // เก็บ _id เพื่อใช้ในการทดสอบต่อไป
        done();
      });
  });

  // POST /api/books โดยไม่ใส่ title
  test('POST /api/books without title', function(done) {
    chai.request(server)
      .post('/api/books')
      .send({})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'missing required field title');
        done();
      });
  });

  // GET /api/books เพื่อดึงข้อมูลหนังสือทั้งหมด
  test('GET /api/books', function(done) {
    chai.request(server)
      .get('/api/books')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        done();
      });
  });

  // GET /api/books/{_id} เพื่อดึงข้อมูลหนังสือเดี่ยว
  test('GET /api/books/{_id} with valid id', function(done) {
    chai.request(server)
      .get('/api/books/' + testBookId)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'title', 'Book should contain title');
        assert.property(res.body, '_id', 'Book should contain _id');
        assert.property(res.body, 'comments', 'Book should contain comments');
        assert.isArray(res.body.comments, 'comments should be an array');
        done();
      });
  });

  // GET /api/books/{_id} ด้วย id ที่ไม่ถูกต้อง
  test('GET /api/books/{_id} with invalid id', function(done) {
    chai.request(server)
      .get('/api/books/invalidid')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'no book exists');
        done();
      });
  });

  // POST /api/books/{_id} เพื่อเพิ่มความคิดเห็นให้หนังสือ
  test('POST /api/books/{_id} with comment', function(done) {
    chai.request(server)
      .post('/api/books/' + testBookId)
      .send({ comment: 'Great book!' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'title', 'Book should contain title');
        assert.property(res.body, '_id', 'Book should contain _id');
        assert.property(res.body, 'comments', 'Book should contain comments');
        assert.isArray(res.body.comments, 'comments should be an array');
        assert.include(res.body.comments, 'Great book!');
        done();
      });
  });

  // POST /api/books/{_id} โดยไม่ใส่ comment
  test('POST /api/books/{_id} without comment', function(done) {
    chai.request(server)
      .post('/api/books/' + testBookId)
      .send({})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'missing required field comment');
        done();
      });
  });

  // DELETE /api/books/{_id} เพื่อทำการลบหนังสือ
  test('DELETE /api/books/{_id} with valid id', function(done) {
    chai.request(server)
      .delete('/api/books/' + testBookId)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'delete successful');
        done();
      });
  });

  // DELETE /api/books/{_id} ด้วย id ที่ไม่ถูกต้อง
  test('DELETE /api/books/{_id} with invalid id', function(done) {
    chai.request(server)
      .delete('/api/books/invalidid')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'no book exists');
        done();
      });
  });

  // DELETE /api/books เพื่อทำการลบหนังสือทั้งหมด
  test('DELETE /api/books', function(done) {
    chai.request(server)
      .delete('/api/books')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'complete delete successful');
        done();
      });
  });

});
