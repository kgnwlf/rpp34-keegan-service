const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: Number,
  reported: Number
}, { collection: 'questions' });

const answerSchema = new mongoose.Schema({
  answer_id: Number,
  body: String,
  date: String,
  answerer_name: String,
  helpfulness: Number,
  reported: Number
}, { collection: 'answers' });

const photoSchema = new mongoose.Schema({
  photo_url: String
}, { collection: 'photos' });

const question = mongoose.model('questions', questionSchema);
const answer = mongoose.model('answers', answerSchema);
const photo = mongoose.model('photos', photoSchema);

module.exports = { question, answer, photo };