// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt"); 
const Database = require("./database");
const User = require("./userModel");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

Database.connect();

app.use('/uploads', express.static('uploads'));

app.get("/", async (req, res) => {
  console.log("connected");
  res.status(201).json({ message: "connected" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while fetching data" });
  }
});

app.post("/users", async (req, res) => {
  const {
    name,
    mobile,
    email,
    dob,
    password,
    confirmPassword,
    gender,
    city,
    agreeTerms,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

  const newUser = new User({
    name,
    mobile,
    email,
    dob,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
    gender,
    city,
    agreeTerms,
  });

  try {
    const savedUser = await newUser.save();
    const userWithoutSensitiveInfo = savedUser.toObject();
    delete userWithoutSensitiveInfo.password;
    delete userWithoutSensitiveInfo.confirmPassword;

    res
      .status(201)
      .json({ message: "Data inserted successfully", user: userWithoutSensitiveInfo });

    const jsonData = JSON.stringify(userWithoutSensitiveInfo);
    fs.writeFileSync("userdata.json", jsonData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "Error occurred while inserting data",
      });
  }
});

app.delete("/users/delete", async (req, res) => {
  const { userIds } = req.body;

  try {
    await User.deleteMany({ _id: { $in: userIds } });

    res.status(200).json({ message: "Users deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Error occurred while deleting users",
    });
  }
});

app.put("/users/update", async (req, res) => {
  const { userIds, updatedData } = req.body;

  try {
    await User.updateMany({ _id: { $in: userIds } }, { $set: updatedData });

    res.status(200).json({ message: "Users updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Error occurred while updating users",
    });
  }
});

const PORT = 2233;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
