const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

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


module.exports = { getQuestions, addAnswers }