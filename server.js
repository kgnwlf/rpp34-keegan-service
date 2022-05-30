const express = require('express');
const app = express();

const db = require('./mongoose.js');

app.get('/', async (req, res) => {
  console.log('Hit route');
  db.findQuestion(3)
  .then((result) => {
    res.status(200).json(result);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});