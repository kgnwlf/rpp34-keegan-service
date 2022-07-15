const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const promise = require('./promiseHelpers.js');
const db = require('./database.js');
const schema = require('./schema.js');

async function getQuestionsWithAnswers(productId) {
  let questions = await db.collection('questions').find({ product_id: productId }).toArray()
  .then((questions) => {
    let notReported = [];

    for (var i = 0; i < questions.length; i++) {
      if (questions[i].reported !== 1) {
        notReported.push(questions[i]);
      }
    }

    return notReported;
  });

  questions = addAnswers(questions);

  return questions;
}

async function getAnswersWithPhotos(questionId) {
  let answers = await db.collection('answers').find({ question_id: questionId }).toArray()
  .then((answers) => {
    let notReported = {};

    for (var j = 0; j < answers.length; j++) {
      if (answers[j].reported !== 1) {

        notReported[answers[j].id] = answers[j];
      }
    }

    return notReported;
  })

  for (var key in answers) {
    let id = answers[key].id;
    answers[key].photos = await db.collection('photos').find({ answer_id: id }).toArray();
  }

  return answers;
}

async function addAnswers(questions) {
  for (var i = 0; i < questions.length; i++) {
    questions[i].answers = await db.collection('answers').find({ question_id: questions[i].question_id }).toArray()
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
        questions[i].answers[key].photos = await db.collection('photos').find({ answer_id: id }).toArray();
      }
    }

  }

  return questions;
}

async function addQuestion(params) {
  let nextId = await db.collection('questions').find().sort({ question_id: -1 }).limit(1).toArray();

  params.id = nextId[0].question_id + 1;

  let newQuestion = new schema.question({
    question_id: params.id,
    product_id: parseInt(params.product_id),
    question_date: new Date(),
    question_body: params.body,
    asker_name: params.name,
    asker_email: params.email,
    reported: 0,
    question_helpfulness: 0
  });

  await newQuestion.save();

  return newQuestion;
};

async function addAnswer(params) {
  let nextId = await db.collection('answers').find().sort({ id: -1 }).limit(1).toArray();

  params.id = nextId[0].id + 1;

  let newAnswer = new schema.answer({
    id: parseInt(params.id),
    date: new Date(),
    body: params.body,
    answerer_name: params.name,
    answerer_email: params.email,
    reported: 0,
    helpfulness: 0
  });

  await newAnswer.save();

  return newAnswer;
}

async function helpful(collection, id) {
  let helpfulness;

  collection === 'questions' ? helpfulness = await promise.getQuestionHelpfulness(id) : helpfulness = await promise.getAnswerHelpfulness(id);

  return promise.markHelpful(collection, id, helpfulness);
}

async function report(collection, id) {
  let query;

  collection === 'questions' ? query = { question_id: id } : query = { id: id };

  await db.collection(collection).updateOne(query, { $set: { reported: 1 } });
};

module.exports = {
  getQuestionsWithAnswers,
  addAnswers,
  getAnswersWithPhotos,
  addQuestion,
  addAnswer,
  helpful,
  report
};