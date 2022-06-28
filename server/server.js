const express = require('express');
const app = express();
const routes = require('./routes.js');

let port = 8080;

app.use(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});