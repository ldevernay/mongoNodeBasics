let {MongoClient} = require('mongodb');
let assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', (err,db) => {
  assert.equal(null, err);
  console.log("Successfully connected to the server.");

  let query = {"category_code": "biotech"};
  let projection = {"name": 1, "category_code": 1, "_id": 0}

  let cursor = db.collection('companies').find(query);
  cursor.project(projection);
  cursor.forEach(
    (doc) => {
      console.log(`${doc.name} is a ${doc.category_code} company.`);
      console.log(doc);
    },
    (err) => {
      assert.equal(err, null);
      return db.close();
    }
  );
});
