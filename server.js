const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./data/mongoose.js');
const schema = require('./data/schema.js');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// app.get('/', (req, res) => {
//   console.log('Hit route');
//   db.getQuestions(3)
//   .then((questions) => {
//     let notReported = [];

//     for (var i = 0; i < questions.length; i++) {
//       if (questions[i].reported !== 1) {
//         notReported.push(questions[i]);
//       }
//     }

//     return notReported;
//   })
//   .then((cleanQuestions) => {
//     return db.addAnswers(cleanQuestions)
//   })
//   .then((answeredQuestions) => {
//     res.status(200).json(answeredQuestions);
//   })
// });

app.get('/qa/questions', async (req, res) => {
  // gets questions for a product id
  // expects product id, page (default 1), and count (default 5)
  // filters out reported questions, do not send them back
  // 200

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

  console.log(req.body);


});

app.post('/qa/questions/:question_id/answers', async (req, res) => {
  // post an answer to a question id
  // expects question id (in url)
  // expects body, name, email, and photos
  // 201
});

app.put('/qa/questions/:question_id/helpful', async (req, res) => {
  // mark question as helpful
  // expects question id (in url)
  // 204
});

app.put('/qa/questions/:question_id/report', async (req, res) => {
  // report a question
  // expect question id (in url)
  // 204
});

app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
  // mark an answer as helpful
  // expects an answer id (in url)
  // 204
});

app.put('/qa/answers/:answer_id/report', async (req, res) => {
  // report an answer
  // expects an answer id (in url)
  // 204
});

mongoose.connect('mongodb://localhost/QnA', { useNewUrlParser: true }, () => {
  console.log('Connected to QnA database');
});

app.listen(3001, () => {
  console.log('Listening on port 3001...');
});