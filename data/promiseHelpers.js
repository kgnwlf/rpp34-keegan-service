const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const db = require('./database.js');

async function getQuestionHelpfulness(id) {
  let helpfulness = await db.collection('questions').find({ question_id: id }).toArray();
  return helpfulness[0].question_helpfulness + 1;

};

async function getAnswerHelpfulness(id) {
  let helpfulness = await db.collection('answers').find({ id: id }).toArray();
  return helpfulness[0].helpfulness + 1;
};

function markHelpful(collection, id, helpfulness) {
  let query;
  let change;

  collection === 'questions' ? query = { question_id: id } : query = { id: id };
  collection === 'questions' ? change = { question_helpfulness: helpfulness } : change = { helpfulness: helpfulness };

  db.collection(collection).updateOne(query, { $set: change });
};

module.exports = {
  getQuestionHelpfulness,
  getAnswerHelpfulness,
  markHelpful
};