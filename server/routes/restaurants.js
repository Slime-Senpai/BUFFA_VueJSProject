const express = require('express');
const router = express.Router();
const Connection = require('../db/Connection');
const ObjectId = require('mongodb').ObjectID;

router.get('/getPage/', async function (req, res) {
  const mongo = await Connection.connectToMongo();
  const collection = mongo.collection('restaurants');
  const pageSize = Number(process.env.PAGESIZE);

  if (mongo === null || collection === null || !pageSize) {
    return res.sendStatus(500);
  }

  const page = req.query.page ? req.query.page : 1;

  try {
    const restaurants = await collection.find({ name: { $not: { $eq: '' } } })
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();

    const count = restaurants.length;

    res.send({ restaurants, count });
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

router.get('/search/:name', async function (req, res) {
  const name = req.params.name;
  const mongo = await Connection.connectToMongo();
  const collection = mongo.collection('restaurants');

  if (mongo === null || collection === null) {
    return res.sendStatus(500);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const restaurants = await collection.find({ name: ObjectId(name) });

    const count = restaurants.length;

    res.send({ restaurants, count });
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

router.get('/get/:id', async function (req, res) {
  const id = req.params.id;
  const mongo = await Connection.connectToMongo();
  const collection = mongo.collection('restaurants');

  if (mongo === null || collection === null) {
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

router.get('/create', async function (req, res) {
  const newRestaurant = req.query.restaurant;
  const mongo = await Connection.connectToMongo();
  const collection = mongo.collection('restaurants');

  if (mongo === null || collection === null) {
    return res.sendStatus(500);
  }

  if (!newRestaurant) {
    return res.sendStatus(400);
  }

  try {
    await collection.insertOne(newRestaurant);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

router.get('/update/:id', async function (req, res) {
  const id = req.params.id;
  const updatedRestaurant = req.query.restaurant;
  const mongo = await Connection.connectToMongo();
  const collection = mongo.collection('restaurants');

  if (mongo === null || collection === null) {
    return res.sendStatus(500);
  }

  if (!id || !updatedRestaurant) {
    return res.sendStatus(400);
  }

  try {
    await collection.replaceOne({ _id: ObjectId(id) }, updatedRestaurant);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
});

router.get('/delete/:id', async function (req, res) {
  const id = req.params.id;
  const mongo = await Connection.connectToMongo();
  const collection = mongo.collection('restaurants');

  if (mongo === null || collection === null) {
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
