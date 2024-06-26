import express from "express";
import Offers from "../models/offers.js";

const anonymousOffers = express.Router();

//Get all the offers
anonymousOffers.get("/home", async (req, res) => {
  try {
    const allOffer = await Offers.find({ status: "1" }).sort({ createdAt: -1 });
    return res.status(200).json(allOffer);
  } catch (err) {
    console.error(err);
  }
});
// Get the info of a simple offer
anonymousOffers.get("/offers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const specificOffer = await Offers.findById(id);
    if (specificOffer.length == 0) return res.status(404);
    return res.status(200).json(specificOffer);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: "Not found" });
  }
});

//Get with name
anonymousOffers.get("/search/:string?", async (req, res) => {
  const searchValue = req.params.string;
  try {
    if (searchValue) {
      const correspondingOffers = await Offers.find({
        $or: [
          { title: { $regex: new RegExp(searchValue, "i") } },
          { company: { $regex: new RegExp(searchValue, "i") } },
        ],
      });
      if (correspondingOffers.length == 0) return res.json([]);
      return res.json(correspondingOffers);
    } else {
      const allOffer = await Offers.find({ status: "1" }).sort({
        createdAt: -1,
      });
      return res.status(200).json(allOffer);
    }
  } catch (err) {
    console.err(err);
  }
});
export default anonymousOffers;
