const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const { assert } = chai;

chai.use(chaiHttp);

suite('Unit Tests', () => {

  test('Translate Mangoes are my favorite fruit. to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Mangoes are my favorite fruit.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        done();
      });
  });

  test('Translate I ate yogurt for breakfast. to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'I ate yogurt for breakfast.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.');
        done();
      });
  });

  test('Translate We had a party at my friend\'s condo. to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'We had a party at my friend\'s condo.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'We had a party at my friend\'s <span class="highlight">flat</span>.');
        done();
      });
  });

  test('Translate Can you toss this in the trashcan for me? to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Can you toss this in the trashcan for me?', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Can you toss this in the <span class="highlight">bin</span> for me?');
        done();
      });
  });

  test('Translate The parking lot was full. to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'The parking lot was full.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'The <span class="highlight">car park</span> was full.');
        done();
      });
  });

  test('Translate Like a high tech Rube Goldberg machine. to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Like a high tech Rube Goldberg machine.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Like a high tech <span class="highlight">Heath Robinson device</span>.');
        done();
      });
  });

  test('Translate To play hooky means to skip class or work. to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'To play hooky means to skip class or work.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'To <span class="highlight">bunk off</span> means to skip class or work.');
        done();
      });
  });

  test('Translate No Mr. Bond, I expect you to die. to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'No Mr. Bond, I expect you to die.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'No <span class="highlight">Mr</span> Bond, I expect you to die.');
        done();
      });
  });

  test('Translate Dr. Grosh will see you now. to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Dr. Grosh will see you now.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, '<span class="highlight">Dr</span> Grosh will see you now.');
        done();
      });
  });

  test('Translate Lunch is at 12:15 today. to British English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Lunch is at 12:15 today.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Lunch is at <span class="highlight">12.15</span> today.');
        done();
      });
  });

  test('Translate We watched the footie match for a while. to American English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'We watched the footie match for a while.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'We watched the <span class="highlight">soccer</span> match for a while.');
        done();
      });
  });

  test('Translate Paracetamol takes up to an hour to work. to American English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Paracetamol takes up to an hour to work.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, '<span class="highlight">Tylenol</span> takes up to an hour to work.');
        done();
      });
  });

  // Add more tests similarly for other sentences...

  test('Highlight translation in Mangoes are my favorite fruit.', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Mangoes are my favorite fruit.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        done();
      });
  });

  test('Highlight translation in I ate yogurt for breakfast.', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'I ate yogurt for breakfast.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.');
        done();
      });
  });

  test('Highlight translation in We watched the footie match for a while.', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'We watched the footie match for a while.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'We watched the <span class="highlight">soccer</span> match for a while.');
        done();
      });
  });

  test('Highlight translation in Paracetamol takes up to an hour to work.', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Paracetamol takes up to an hour to work.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, '<span class="highlight">Tylenol</span> takes up to an hour to work.');
        done();
      });
  });

});
