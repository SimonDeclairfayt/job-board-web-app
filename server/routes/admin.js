import express, { application } from "express";
import Offers from "../models/offers.js";
import Application from "../models/applications.js";

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
admin.get("/offers/:id", async (req, res) => {
  const offerId = req.params.id;
  try {
    const currentOffer = await Offers.findById(offerId);
    if (!currentOffer) return res.status(404).send("Not Found");
    const applicantsForThisOffer = await Application.find({ offerId: offerId });
    return res.send([currentOffer, applicantsForThisOffer]);
  } catch (err) {
    console.error(err);
  }
});
export default admin;
