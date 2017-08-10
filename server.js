const express = require('express');
const engines = require('consolidate');

let {MongoClient} = require('mongodb');
let assert = require('assert');


let app = express();
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
  assert.equal(null, err);
  console.log("Successfully connected to the MongoDB server.");

  app.get('/', (req, res) => {
    db.collection('movies').find({}).toArray((err, docs) => {
      res.render('movies', {'movies': docs});
    });
    // db.collection('movies').find({}).toArray((err, docs) => {
    //   docs.forEach((doc) => {
    //     console.log(JSON.stringify(doc, undefined, 2));
    //   });
    // });
  });

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
