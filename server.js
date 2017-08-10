const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');

let {MongoClient} = require('mongodb');
let assert = require('assert');


let app = express();
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
// bodyParser is mandatory to fetch url data from post form
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
  assert.equal(null, err);
  console.log("Successfully connected to the MongoDB server.");

  app.get('/', (req, res) => {
    db.collection('movies').find({}).toArray((err, docs) => {
      res.render('movies', {'movies': docs});
    });
  });

  app.get('/add', (req, res) => {
    res.render('add_movie');
  });

  app.post('/add_movie', (req, res, next) => {
    var favorite_movie = {
      'title': req.body.title,
      'year': req.body.year
    };
    db.collection('movies').insertOne(favorite_movie);
    res.redirect('/');
  })

  app.use((req, res) => {
    res.sendStatus(404);
  });

  let server = app.listen(3000, () => {
    let port = server.address().port;
    console.log(`Listening to port ${port}.`);
  });
  //
  // db.close();
});
