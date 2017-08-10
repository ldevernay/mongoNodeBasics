const express = require('express');
const engines = require('consolidate');

let app = express();
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

app.get('/', (req, res) => {
  res.render('hello', {'name': 'Bob'});
});

app.use((req, res) => {
  res.sendStatus(404);
});

let server = app.listen(3000, () => {
  let port = server.address().port;
  console.log(`Listening to port ${port}.`);
});
