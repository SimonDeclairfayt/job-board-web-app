import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user.js";

const authentication = express.Router();
/*
authentication.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    if (!password) {
      console.log(password);
      return res.status(400).send("Missing password");
    } else if (!email) {
      return res.status(400).send("Missing email");
    } else if (!username) {
      return res.status(400).send("Missing username");
    }

    const newUser = new User({
      username: username,
      password: password,
      email: email,
      is_admin: true,
    });
    await newUser.save();
    return res.send("User registered");
  } catch (err) {
    console.log(err);
  }
});
*/
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
