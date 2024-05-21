import express from "express";
import { database } from "./config/db.js";
import verifyAuth from "./middleware/verifyAuth.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authentication from "./routes/authentication.js";
import offersControl from "./routes/offersControl.js";
import "dotenv/config";
import anonymousOffers from "./routes/anonymousOffers.js";
import apply from "./routes/apply.js";
import admin from "./routes/admin.js";
const app = express();

database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(3333, () => {
  console.log(`Server started at http://localhost:3333`);
});

app.get("/", (req, res) => {
  return res.status(200).send("Hello");
});

//LOGIN ROUTE IN ADMIN
app.use("/api", authentication);

//GET ALL OFFERS
app.use("/api", anonymousOffers);
//POSTULER A UNE OFFRE
app.use("/api", apply);
//LA LES AUTRES ROUTES ADMIN
// JWT MIDDLEWARE
app.use(verifyAuth);

app.use("/admin", offersControl);

app.use("/admin", admin);
