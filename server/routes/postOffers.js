import express from "express";
import Offers from "../models/offers.js";
import uploadFile from "../utils/upload.js";
import upload from "../middleware/multer.js";

const postOffers = express.Router();

postOffers.post(
  "/offers",
  upload.fields([{ name: "logo" }, { name: "image" }]),
  async (req, res) => {
    try {
      const title = req.body.title,
        company = req.body.company,
        description = req.body.description,
        createdBy = req.user.id;
      if (!title || !company || !description) {
        return res.status(400).send("Missing Values");
      }
      let logoUrl, imageUrl;
      if (req.files.logo) {
        logoUrl = await uploadFile(req.files.logo[0]);
      } else {
        return res.status(400).send("Logo is required");
      }
      if (req.files.image) {
        imageUrl = await uploadFile(req.files.image[0]);
      } else {
        return res.status(400).send("Image of the company is required");
      }
      const newOffer = new Offers({
        title,
        company,
        logo: logoUrl,
        image: imageUrl,
        description,
        createdBy,
      });

      await newOffer.save();
      return res
        .status(201)
        .json({ message: "Offer created successfully!", offer: newOffer });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error creating offer");
    }
  }
);

export default postOffers;
