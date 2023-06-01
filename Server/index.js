import "./loadEnv.js";
import express from "express";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import cors from "cors";
import db from "./conn.js";
import { ObjectId } from "mongodb";

// Initialize the express app.
const app = express();
app.use(cors());
app.use(express.json({ extended: true, limit: "1mb" }));

// signup route
app.post("/registration", async (req, res) => {
  const { userName, password } = req.body;

  console.log('userName --', userName, 'password', password);

  const collection = await db.collection("todo_user_list");

  const userData = await collection.findOne({ userName });
  console.log('userData', userData);

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
  if(userData){
    console.log('userData', userData);
    const { password: passwordFromDb, _id } = userData;
  
    const passwordMatch = await compare(password, passwordFromDb);
  
    if (passwordMatch) {
      const token = jwt.sign(_id.toString(), process.env.SECRET_KEY);
      res.status(201);
      res.json({ msg: `Welcome, ${userName}`, token, id: _id.toString() });
    } else {
      res.json({ msg: "Password Incorrect!!" });
    }
  } else {
    res.json({ msg: "Invalid user" });
  }
  
});

app.post('/delete', async(req,res)=>{
  const { id } = req.body;
  console.log('id received', id);
  const collection = await db.collection("todo_user_list");

  const { deletedCount, acknowledged } = await collection.deleteOne({ _id: new ObjectId(id) });
  console.log('ack-->', ack);
  if(acknowledged){
    res.json({ msg: 'Account deleted!!'})
  } else {
    res.json({ msg: "Delete failed" });
  }
})

app.listen(process.env.PORT, () => {
  console.log("Server running at ", process.env.PORT);
});
