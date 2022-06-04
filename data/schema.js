const mongoose = require('mongoose');

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

module.exports = { question, answer, photo };