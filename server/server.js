import express from "express";
import { database } from "./config/db.js";
import verifyAuth from "./middleware/verifyAuth.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authentication from "./routes/authentication.js";
import postOffers from "./routes/postOffers.js";
import "dotenv/config";
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
app.use("", authentication);

//GET ALL OFFERS

//POSTULER A UNE OFFRE

//LA LES AUTRES ROUTES ADMIN
// JWT MIDDLEWARE
app.use(verifyAuth);

app.use("/admin", postOffers);
