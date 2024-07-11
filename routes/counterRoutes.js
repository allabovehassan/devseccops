const express = require("express");
require("dotenv").config();
const counterRouter = express.Router();
const { Counter } = require("../model/counterModel");
const messages = require("../utils/messages");

// Endpoint to get the counter
counterRouter.get("/", async (req, res) => {
  try {
    const counter = await Counter.findOne();
    if (counter || counter === 0) {
      return res.status(200).send({
        success: true,
        message: messages.COUNTER_FETCHED,
        data: {
          count: counter.count
        }
      });
    }
    return res.status(400).send({
      success: false,
      message: messages.COUNT_NOT_FOUND,
      data: null
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error)
    });
  }
});


// Endpoint to reset the counter
counterRouter.put("/reset", async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      {},
      { count: 0 },
      { new: true, upsert: true }
    );

    return res.status(200).send({
      success: true,
      message: messages.COUNTER_RESET,
      data: {
        count: counter.count
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error)
    });
  }
});

// Endpoint to increment the counter
counterRouter.post("/increment", async (req, res) => {
  try {
    const currentCounter = await Counter.findOne();

    let oldCount = 0;
    if (currentCounter) {
      oldCount = currentCounter.count;
    } else {
      await new Counter({
        count: 0
      }).save();
    }

    // Increment the count
    const counter = await Counter.findOneAndUpdate(
      {},
      {
        $inc: {
          count: 1
        }
      },
      {
        new: true,
        upsert: true
      }
    );

    const newCount = counter.count;

    return res.status(200).send({
      success: true,
      message: messages.COUNTER_UPDATED,
      data: {
        oldCount,
        newCount
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error)
    });
  }
});

module.exports = { counterRouter };
