const express = require("express");
const { getAllInquiries, getInquiryById, createInquiry } = require("./service");

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

router.get("/:inquiryId", async (req, res, next) => {
  try {
    const inquiry = await getInquiryById(req.params.inquiryId);
    res.json(inquiry);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, title, content, photo_url_1 } = req.body;
    const newInquiry = await createInquiry({
      user_id,
      title,
      content,
      photo_url_1,
    });
    res.json(newInquiry);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
