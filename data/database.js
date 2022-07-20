const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/QnA');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', async () => {
  console.log('mongoose connected successfully');
});

module.exports = db;