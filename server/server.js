const express = require('express');
const app = express();
const routes = require('./routes.js');

app.use(routes);

app.listen(3001, () => {
  console.log('Listening on port 3001...');
});