const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();

async function onViewHoop(req, res) {
  res.render('edit');
}
router.get('/id/:id', onViewHoop);

function onViewIndex(req, res) {
  res.render('menu');
}
router.get('/', onViewIndex);

module.exports = router;
