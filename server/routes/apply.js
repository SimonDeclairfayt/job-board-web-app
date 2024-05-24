import express from "express";
import Offers from "../models/offers.js";
import Application from "../models/applications.js";
import upload from "../middleware/multer.js";
import uploadFile from "../utils/upload.js";

const apply = express.Router();

apply.post("/offers/:id", upload.single("cv"), async (req, res) => {
  const offerId = req.params.id;
  const firstName = req.body.firstName,
    lastName = req.body.lastName,
    email = req.body.email;
  try {
    if (!firstName || !lastName || !email)
      return res
        .status(400)
        .json({ firstname: firstName, lastname: lastName, email: email });
    const specificOffer = await Offers.findById(offerId);
    if (specificOffer.length == 0) return res.status(404);
    let cvUrl;
    if (req.file) {
      cvUrl = await uploadFile(req.file);
    } else {
      return res.status(400).json({ message: "CV is required" });
    }
    const newApply = new Application({
      offerId: offerId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      cvUrl: cvUrl,
    });
    await newApply.save();
    return res
      .status(201)
      .json({ message: "Successfully applied!", offer: newApply });
  } catch (err) {
    console.error(err);
  }
});
export default apply;
