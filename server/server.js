const express = require('express');
const app = express();
const routes = require('./routes.js');
const db = require('../data/database.js');

let port = 8080;

app.use(routes);

app.listen(port, () => {
  db;
  console.log(`Listening on port ${port}...`);
});