const express = require('express');
const router = express.Router();
const Connection = require('../db/Connection');
const ObjectId = require('mongodb').ObjectID;

router.get('/getPage/', async function (req, res) {
  const mongo = await Connection.connectToMongo();
  if (mongo === null) {
    return res.sendStatus(500);
  }
  const collection = mongo.collection('restaurants');

  if (collection === null) {
    return res.sendStatus(500);
  }

  const page = req.query.page ? req.query.page : 1;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 50;
  const name = req.query.name ? req.query.name : null;

  const query = name ? { name: new RegExp(`.*${name}.*`, 'i') } : { name: { $not: { $eq: '' } } };

  try {
    const restaurants = await collection.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const count = Math.ceil((await collection.countDocuments(query)) / pageSize);

    res.send({ restaurants, count });
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

router.get('/get/:id', async function (req, res) {
  const id = req.params.id;
  const mongo = await Connection.connectToMongo();

  if (mongo === null) {
    return res.sendStatus(500);
  }

  const collection = mongo.collection('restaurants');

  if (collection === null) {
    return res.sendStatus(500);
  }

  if (!id) {
    return res.sendStatus(400);
  }

  try {
    const restaurant = await collection.findOne({ _id: ObjectId(id) });

    res.send(restaurant);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

router.post('/create', async function (req, res) {
  const newRestaurant = req.body.restaurant;
  const id = req.body.id;
  const mongo = await Connection.connectToMongo();

  if (mongo === null) {
    return res.sendStatus(500);
  }

  const collection = mongo.collection('restaurants');

  if (collection === null) {
    return res.sendStatus(500);
  }

  if (!newRestaurant) {
    return res.sendStatus(400);
  }

  try {
    if (id === null) {
      await collection.insertOne(newRestaurant);
      res.sendStatus(201);
    } else {
      await collection.replaceOne({ _id: ObjectId(id) }, newRestaurant);
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

router.get('/delete/:id', async function (req, res) {
  const id = req.params.id;
  const mongo = await Connection.connectToMongo();

  if (mongo === null) {
    return res.sendStatus(500);
  }

  const collection = mongo.collection('restaurants');

  if (collection === null) {
    return res.sendStatus(500);
  }

  if (!id) {
    return res.sendStatus(400);
  }

  try {
    await collection.deleteOne({ _id: ObjectId(id) });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

module.exports = router;
