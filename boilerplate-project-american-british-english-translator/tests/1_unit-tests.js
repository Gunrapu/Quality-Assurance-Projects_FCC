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

  test('Translate First, caramelise the onions. to American English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'First, caramelise the onions.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'First, <span class="highlight">caramelize</span> the onions.');
        done();
      });
  });
  
  test('Translate I spent the bank holiday at the funfair. to American English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'I spent the bank holiday at the funfair.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.');
        done();
      });
  });
  
  test('Translate I had a bicky then went to the chippy. to American English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'I had a bicky then went to the chippy.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.');
        done();
      });
  });
  
  test("Translate I've just got bits and bobs in my bum bag. to American English", done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: "I've just got bits and bobs in my bum bag.", locale: 'british-to-american' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.");
        done();
      });
  });
  
  test('Translate The car boot sale at Boxted Airfield was called off. to American English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'The car boot sale at Boxted Airfield was called off.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.');
        done();
      });
  });
  
  test('Translate Have you met Mrs Kalyani? to American English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Have you met Mrs Kalyani?', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Have you met <span class="highlight">Mrs.</span> Kalyani?');
        done();
      });
  });
  
  test('Translate Prof Joyner of King\'s College, London. to British English', done => {
    chai.request(server)
        .post('/api/translate')
        .send({ text: 'Prof Joyner of King\'s College, London.', locale: 'british-to-american' })
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.translation, '<span class="highlight">Prof.</span> Joyner of King\'s College, London.');
          done();
        })
  });
  
  test('Translate Tea time is usually around 4 or 4.30. to American English', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Tea time is usually around 4 or 4.30.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Tea time is usually around 4 or <span class="highlight">4.30</span>.');
        done();
      });
  });
  
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
