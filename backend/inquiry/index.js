const express = require("express");
// const sequelize = require("../models/connectToDB")
// const Inquiry = require("../models/inquiry");
const { getAllInquiries } = require("./service");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const inquiries = await getAllInquiries();
    res.json(inquiries);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
