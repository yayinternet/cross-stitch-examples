const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const auth = require('../google-auth.js');

const router = express.Router();
const jsonParser = bodyParser.json();

async function onCreateHoop(req, res) {
  const idToken = req.body.idToken;
  const userInfo = await auth.validateToken(idToken);

  const userQuery = { email: userInfo.email };
  const userResponse = await req.users.findOne(userQuery);
  let id = null;
  if (!userResponse) {
    const response = await req.users.insertOne(userQuery);
    id = response.insertedId;
  } else {
    id = userResponse._id;
  }
  const hoopsResponse = await req.hoops.insertOne({ authorId: id });
  res.json({ id: hoopsResponse.insertedId });
}
router.post('/create', jsonParser, onCreateHoop);

async function onSaveHoop(req, res) {
  const idToken = req.body.idToken;
  const userInfo = await auth.validateToken(idToken);
  const userQuery = { email: userInfo.email };
  const userResponse = await req.users.findOne(userQuery);

  const id = req.body.id;
  const name = req.body.name;
  const data = req.body.data;
  let query = {};
  if (id) {
    query = { _id: ObjectID(id), authorId: ObjectID(userResponse._id) };
  }
  const newEntry = { name: name, data: data, authorId: ObjectID(userResponse._id)};
  const params = { upsert: true };
  const response = await req.hoops.update(query, newEntry, params);
  const updatedId = id || response._id;

  res.json({ id: updatedId });
}
router.post('/save', jsonParser, onSaveHoop);

async function onLoadHoop(req, res) {
  const idToken = req.params.idToken;
  let result = null
  try {
    const userInfo = await auth.validateToken(idToken);
    const userQuery = { email: userInfo.email };
    const userResponse = await req.users.findOne(userQuery);

    const id = req.params.id;
    const query = { _id: ObjectID(id), authorId: ObjectID(userResponse._id) };
    result = await req.hoops.findOne(query);
  } catch (e) { }
  res.json(result);
}
router.get('/load/:id/token/:idToken', onLoadHoop);


async function onLoadAllHoops(req, res) {
  const idToken = req.params.idToken;
  const userInfo = await auth.validateToken(idToken);
  const userQuery = { email: userInfo.email };
  const userResponse = await req.users.findOne(userQuery);
  let result = null;
  if (userResponse) {
    result = await req.hoops.find({authorId: ObjectID(userResponse._id) }).toArray();
  }
  res.json({ response: result });
}
router.get('/load/:idToken', onLoadAllHoops);

module.exports = router;
