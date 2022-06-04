const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const questionSchema = new mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: [{ type: mongoose.Types.ObjectId, ref: 'answers' }]
}, { collection: 'questions' });

const answerSchema = new mongoose.Schema({
  question_id: { type: mongoose.Types.ObjectId, ref: 'questions' } ,
  answer_id: Number,
  body: String,
  date: String,
  answerer_name: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [{ type: mongoose.Types.ObjectId, ref: 'photos' }]
}, { collection: 'answers' });

const photoSchema = new mongoose.Schema({
  answer_id: { type: mongoose.Types.ObjectId, ref: 'answers' } ,
  photo_url: String
}, { collection: 'photos' });

const question = mongoose.model('questions', questionSchema);
const answer = mongoose.model('answers', answerSchema);
const photo = mongoose.model('photos', photoSchema);

function getQuestions(id) {
  return new Promise ((resolve, reject) => {
    MongoClient.connect('mongodb://localhost/QnA', (err, db) => {
      if (err) {
        reject(err);
      };

      db.db('QnA').collection('questions').find({ product_id: id }).toArray(function(err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);
        db.close();
      });
    });
  });
};

async function addAnswers(questions) {
  for (var i = 0; i < questions.length; i++) {
    questions[i].answers = await iWantAnswers(questions[i].id)
    .then((answers) => {
      let notReported = {};

      for (var j = 0; j < answers.length; j++) {
        if (answers[j].reported !== 1) {

          notReported[answers[j].id] = answers[j];
        }
      }

      return notReported;

    });


    for (var key in questions[i].answers) {
      if (questions[i].answers) {
        let id = questions[i].answers[key].id;
        questions[i].answers[key].photos = await picsOrDidntHappen(id);

      }
    }

  }



  return questions;
}

function iWantAnswers(questionId) {
  return new Promise ((resolve, reject) => {
    MongoClient.connect('mongodb://localhost/QnA', (err, db) => {

      db.db('QnA').collection('answers').find({ question_id: questionId }).toArray(function (err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);

      });
    });
  });
};

function picsOrDidntHappen(answerId) {
  return new Promise ((resolve, reject) => {

    MongoClient.connect('mongodb://localhost/QnA', (err, db) => {
      db.db('QnA').collection('photos').find({ answer_id: answerId }).toArray(function (err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);

      });
    });
  });
};


module.exports = { question, answer, photo, getQuestions, addAnswers }