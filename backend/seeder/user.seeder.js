import { users } from "../db/users.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config();

const SeederUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // await User.deleteMany();
    // console.log("users Are Deleted !");

    await User.insertMany(users);
    console.log("users Are Added !");
  } catch (error) {
    console.log(error);
  }
};
SeederUsers();
