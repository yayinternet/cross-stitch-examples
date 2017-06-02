const bodyParser = require('body-parser');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

const DATABASE_NAME = 'cross-stitch';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

let hoops = null;
async function startServer() {
  const db = await MongoClient.connect(MONGO_URL);
  hoops = db.collection('hoops');

  await app.listen(3000);
  console.log('Listening on port 3000');
}
startServer();

////////////////////////////////////////////////////////////////////////////////

// JSON routes

async function onSaveHoop(req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const data = req.body.data;
  let query = {};
  if (id) {
    query = { _id: ObjectID(id) };
  }
  const newEntry = { name: name, data: data };
  const params = { upsert: true };
  const response = await hoops.update(query, newEntry, params);

  res.json({ success: true });
}
app.post('/save', jsonParser, onSaveHoop);

async function onLoadHoop(req, res) {
  const result = await hoops.findOne();
  let response = null;
  if (result) {
    response = {
      id: result._id,
      name: result.name,
      data: result.data
    };
  }
  res.json(response);
}
app.get('/load', onLoadHoop);
