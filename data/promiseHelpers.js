const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const db = 'mongodb://localhost/QnA';

function getQuestions(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(db, (err, db) => {
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

function iWantAnswers(questionId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(db, (err, db) => {

      db.db('QnA').collection('answers').find({ question_id: questionId }).toArray(function (err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);
        db.close();
      });
    });
  });
};

function picsOrDidntHappen(answerId) {
  return new Promise((resolve, reject) => {

    MongoClient.connect(db, (err, db) => {
      db.db('QnA').collection('photos').find({ answer_id: answerId }).toArray(function (err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);
        db.close();
      });
    });
  });
};

function findNextQuestionId() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(db, (err, db) => {
      db.db('QnA').collection('questions').find().sort({ question_id: -1 }).limit(1).toArray(function (err, result) {
        if (err) {
          reject(err);
        }
        console.log(result);
        resolve(result[0].question_id + 1);
        db.close();
      });
    });
  });
};

function findNextAnswerId() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(db, (err, db) => {
      db.db('QnA').collection('answers').find().sort({ id: -1 }).limit(1).toArray(function (err, result) {
        if (err) {
          reject(err);
        }

        resolve(result[0].id + 1);
        db.close();
      });
    });
  });
};

function postNewQuestion(params) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(db, (err, db) => {
      if (err) {
        reject(err);
      }

      db.db('QnA').collection('questions').insertOne({
        question_id: params.id,
        product_id: parseInt(params.product_id),
        question_date: new Date(),
        question_body: params.body,
        asker_name: params.name,
        asker_email: params.email,
        reported: 0,
        question_helpfulness: 0
      }, function(err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);
        db.close();
      })
    });
  });
};

function postNewAnswer(params) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(db, (err, db) => {
      if (err) {
        reject(err);
      }

      db.db('QnA').collection('answer').insertOne({
        id: parseInt(params.id),
        date: new Date(),
        body: params.body,
        answerer_name: params.name,
        answerer_email: params.email,
        reported: 0,
        helpfulness: 0
      }, function(err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);
        db.close();
      })
    });
  });
};

function getQuestionHelpfulness(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(db, (err, db) => {
      db.db('QnA').collection('questions').find({ question_id: id }).limit(1).toArray(function(err, result) {
        if (err) {
          reject(err);
        }

        resolve(result[0].question_helpfulness + 1);
        db.close();
      });
    });
  });
};

function getAnswerHelpfulness(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(db, (err, db) => {
      db.db('QnA').collection('answers').find({ id: id }).limit(1).toArray(function(err, result) {
        if (err) {
          reject(err);
        }

        resolve(result[0].helpfulness + 1);
        db.close();
      });
    });
  });
};

function markHelpful(collection, id, helpfulness) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(db, (err, db) => {
      let query;
      let change;

      collection === 'questions' ? query = { question_id: id } : query = { id: id };
      collection === 'questions' ? change = { question_helpfulness: helpfulness } : change = { helpfulness: helpfulness };

      db.db('QnA').collection(collection).updateOne(query, { $set: change }, function (err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);
        db.close();
      })
    })
  })
}

module.exports = {
  getQuestions,
  iWantAnswers,
  picsOrDidntHappen,
  findNextQuestionId,
  findNextAnswerId,
  postNewQuestion,
  postNewAnswer,
  getQuestionHelpfulness,
  getAnswerHelpfulness,
  markHelpful,
  db: db
};