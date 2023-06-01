import "./loadEnv.js";
import express from "express";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import cors from "cors";
import db from "./conn.js";

// Initialize the express app.
const app = express();
app.use(cors());
app.use(express.json({ extended: true, limit: "1mb" }));

// signup route
app.post("/registration", async (req, res) => {
  const { userName, password } = req.body;

  const collection = await db.collection("todo_user_list");

  const userData = await collection.findOne({ userName });

  if (userData) {
    res.json({ msg: "Existing user!!" });
  }

  const encryptedPassword = await hash(password, 10);

  const { acknowledged, insertedId } = await collection.insertOne({
    userName,
    password: encryptedPassword,
  });

  if (acknowledged) {
    console.log("res --> insertedId", insertedId);
    const token = jwt.sign(insertedId.toString(), process.env.SECRET_KEY);

    res.json({ msg: acknowledged, token });
  } else {
    res.json({ msg: "Account creation error!! Please try after sometime." });
  }
});

// signup route
app.post("/signin", async (req, res) => {
  const { userName, password } = req.body;

  const collection = await db.collection("todo_user_list");

  const userData = await collection.findOne({ userName });
  const { password: passwordFromDb, _id } = userData;

  const passwordMatch = await compare(password, passwordFromDb);

  if (passwordMatch) {
    const token = jwt.sign(_id, process.env.SECRET_KEY);
    res.status(201);
    res.json({ msg: `Welcome, ${userName}`, token });
  } else {
    res.json({ msg: "Password Incorrect!!" });
  }
  // res.json({ msg: "Testing" });
});

app.listen(process.env.PORT, () => {
  console.log("Server running at ", process.env.PORT);
});
