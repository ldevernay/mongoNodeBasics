let {MongoClient} = require('mongodb');
let assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', (err,db) => {
  assert.equal(null, err);
  console.log("Successfully connected to the server.");

  var query = {"category_code": "biotech"};

  db.collection('companies').find(query).toArray((err, docs) => {
    assert.equal(err, null);
    assert.notEqual(docs.length, 0);

    docs.forEach((doc) => {
      console.log(`${doc.name} is a ${doc.category_code} company.`);
    });

    db.close();
  });
  console.log('Called find()');
});
