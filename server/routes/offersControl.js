import express from "express";
import Offers from "../models/offers.js";
import uploadFile from "../utils/upload.js";
import upload from "../middleware/multer.js";

const offersControl = express.Router();

offersControl.post(
  "/offers",
  upload.fields([{ name: "logo" }, { name: "image" }]),
  async (req, res) => {
    try {
      const title = req.body.title,
        company = req.body.company,
        description = req.body.description,
        createdBy = req.user.id;
      //const tags = req.body.tags;
      if (!title || !company || !description) {
        return res.status(400).send("Missing Values");
      }
      //if (!tags) tags = {};
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
        //tags: tags,
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
offersControl.patch(
  "/offers/:id",
  upload.fields([{ name: "logo" }, { name: "image" }]),
  async (req, res) => {
    const offerId = req.params.id;
    try {
      const title = req.body.title,
        company = req.body.company,
        description = req.body.description,
        logo = req.files.logo,
        image = req.files.image,
        status = req.body.status;

      const updatedOffer = await Offers.findByIdAndUpdate(offerId, {
        $set: {
          title: title ? title : undefined,
          company: company ? company : undefined,
          logo: logo ? await uploadFile(req.files.logo[0]) : undefined,
          image: image ? await uploadFile(req.files.image[0]) : undefined,
          description: description ? description : undefined,
          status: status ? status : undefined,
        },
      });
      if (!updatedOffer) {
        return res.status(404).send("Offer not found");
      }
      return res.status(201).json({ message: "Offer updated successfully!" });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error updating offer");
    }
  }
);

offersControl.delete("/offers/:id", async (req, res) => {
  const offerId = req.params.id;
  try {
    const deleteOffer = await Offers.findByIdAndDelete(offerId);
    if (!deleteOffer) {
      return res.status(404).send("Offer not found");
    }
    return res.status(201).json({ message: "Offer deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error updating offer");
  }
});

export default offersControl;
