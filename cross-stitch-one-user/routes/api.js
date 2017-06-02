const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

async function onCreateHoop(req, res) {
  const response = await req.hoops.insertOne({});
  res.json({ id: response.insertedId });
}
router.post('/create', jsonParser, onCreateHoop);

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
  const response = await req.hoops.update(query, newEntry, params);
  const updatedId = id || response._id;

  res.json({ id: updatedId });
}
router.post('/save', jsonParser, onSaveHoop);

async function onLoadHoop(req, res) {
  const id = req.params.id;
  const query = { _id: ObjectID(id) };
  const result = await req.hoops.findOne(query);
  res.json(result);
}
router.get('/load/:id', onLoadHoop);


async function onLoadAllHoops(req, res) {
  const result = await req.hoops.find().toArray();
  res.json({ response: result });
}
router.get('/load', onLoadAllHoops);

module.exports = router;
