import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user.js";

const authentication = express.Router();

authentication.post("/login", async (req, res) => {
  try {
    const username = req.body.username,
      password = req.body.password;
    if (!username || !password) {
      return !username
        ? res.status(400).send("Missing Username")
        : res.status(400).send("Missing Password");
    }
    let userExists = await User.findOne({ username: username });
    if (!userExists) return res.status(404).send("User not found");
    const match = await bcrypt.compare(password, userExists.password);
    if (match) {
      let Token = jwt.sign(
        {
          id: userExists._id,
          username: userExists.username,
          email: userExists.email,
          is_admin: userExists.is_admin,
        },
        process.env.STRONG_PASSWORD,
        { expiresIn: "8h" }
      );
      res.cookie("token", Token, {
        path: "/admin",
        maxAge: 28800000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.send({ accessToken: Token });
    } else {
      return res.status(404).send("Wrong password and email combination");
    }
  } catch (err) {
    console.error(err);
  }
});
export default authentication;
