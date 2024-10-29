const express = require("express");
const router = express.Router();
// const { getAllInquiries, getInquiryById, createInquiry } = require("./service");
const Inquiry = require("../models/inquiry");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const inquiries = await Inquiry.findAll();
      // res.json(inquiries);
      console.log(inquiries);
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
  // router.post("/", async (req, res) => {
  //   try {
  //     const { user_id, title, content, photo_url_1 } = req.body;
  //     const newInquiry = await createInquiry({
  //       user_id,
  //       title,
  //       content,
  //       photo_url_1,
  //     });
  //     // res.json(newInquiry);
  //     console.log(newInquiry);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  .post(upload.single("photo"), async (req, res, next) => {
    try {
      const { user_id, title, content } = req.body;
      const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const newInquiry = await Inquiry.create({
        user_id: req.body.user_id,
        title: req.body.title,
        content: req.body.content,
        photo_url: photoUrl,
      });
      //   ({
      //   user_id,
      //   title,
      //   content,
      //   photo_url: photoUrl,
      // });

      // res.status(201).json(newInquiry);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

router
  .route("/:inquiryId")
  .get(async (req, res, next) => {
    try {
      const inquiry = await Inquiry.findByPk(req.params.inquiryId);
      // res.json(inquiry);
      console.log(inquiry);
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
  // 문의글 수정, 삭제 기능은 제공하지 않을 예정이지만, 기본 형태 구현만 해둔다.
  .put(async (req, res, next) => {
    try {
      const inquiryId = Math.Number(req.params.inquiryId);
      const updateData = req.body;
      const [updatedRowCount] = await Inquiry.update(updateData, {
        where: { inquiry_id: inquiryId },
      });

      if (updatedRowCount === 0) {
        return res.status(404).send("Inquiry not found");
      }

      res.send("inquiry updated successfully");
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const inquiryId = req.params.inquiryId;
      const deletedRowsCount = await Inquiry.destroy({
        where: { inquiry_id: inquiryId },
      });

      if (deletedRowsCount === 0) {
        return res.status(404).send("Inquiry not found");
      }

      res.send("Inquiry deleted successfully");
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
