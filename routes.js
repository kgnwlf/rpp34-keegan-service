const express = require('express');
const app = express();
const db = require('./data/dbInteractions.js');
const schema = require('./data/schema.js');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
  db.findNextQuestionId(3)
  .then((id) => {
    res.json(id);
  });

});

app.get('/qa/questions', async (req, res) => {
  // gets questions for a product id
  // expects product id, page (default 1), and count (default 5)
  // filters out reported questions, do not send them back
  // 200

  // ADD ERROR HANDLING FOR INCOMING INFORMATION

  db.getQuestionsWithAnswers(parseInt(req.query.product_id))
  .then((questions) => {
    res.status(200).json({results: questions});
  })
  .catch((err) => {
    res.status(500);
  });

});

app.get('/qa/questions/:question_id/answers', async (req, res) => {
  // gets answer list for a question id
  // expects question id (in url)
  // expects page (default 1) and count (default 5)
  // 200

  db.getAnswersWithPhotos(parseInt(req.params.question_id))
  .then((answers) => {
    res.status(200).json(answers);
  })
  .catch((err) => {
    res.status(500);
  });

});

app.post('/qa/questions', async (req, res) => {
  // post a question to a product id
  // expects body, name, email, product id
  // 201

  db.addQuestion(req.body)
  .then((success) => {
    res.status(201).end();
  })
  .catch((err) => {
    res.status(500).end();
  });

});

app.post('/qa/questions/:question_id/answers', async (req, res) => {
  // post an answer to a question id
  // expects question id (in url)
  // expects body, name, email, and photos
  // 201

  db.addAnswer(req.body)
  .then(() => {
    res.status(201).end();
  })
  .catch(() => {
    res.status(500).end();
  });

});

app.put('/qa/questions/:question_id/helpful', async (req, res) => {
  // mark question as helpful
  // expects question id (in url)
  // 204

  console.log(req.params.question_id)

  db.helpful('questions', parseInt(req.params.question_id))
  .then(() => {
    res.status(204).end();
  })
  .catch(() => {
    res.status(500).end();
  });

});

app.put('/qa/questions/:question_id/report', async (req, res) => {
  // report a question
  // expect question id (in url)
  // 204

  db.report('questions', parseInt(req.params.question_id))
  .then(() => {
    res.status(204).end();
  })
  .catch(() => {
    res.status(500).end();
  })

});

app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
  // mark an answer as helpful
  // expects an answer id (in url)
  // 204

  db.helpful('answers', parseInt(req.params.answer_id))
  .then(() => {
    res.status(204).end();
  })
  .catch(() => {
    res.status(204).end();
  });

});

app.put('/qa/answers/:answer_id/report', async (req, res) => {
  // report an answer
  // expects an answer id (in url)
  // 204

  db.report('answers', parseInt(req.params.answer_id))
  .then(() => {
    res.status(204).end();
  })
  .catch(() => {
    res.status(500).end();
  })

});

module.exports = app;