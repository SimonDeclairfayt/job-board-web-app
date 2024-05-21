import express, { application } from "express";
import Offers from "../models/offers.js";

const admin = express.Router();

admin.get("/", async (req, res) => {
  try {
    const pendingOffers = await Offers.find({ status: "1" }).sort({
      createdAt: -1,
    });
    const doneOffers = await Offers.find({ status: "2" }).sort({
      createdAt: -1,
    });
    return res.send([...pendingOffers, ...doneOffers]);
  } catch (err) {
    console.error(err);
  }
});

export default admin;
