const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Inquiry = require("../models/inquiry");
const logger = require("../logger");

try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "uploads/");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  // limits: { fileSize: 5 * 1024 * 1024 }, // TODO : 파일 사이즈 초과시 에러 처리 구현
});

// POST /inquiry/image
// router.post("/image", isLoggedIn, upload.single("image1"), afterUploadImage);
router.post("/image", upload.single("image1"), (req, res, next) => {
  logger.info(`요청.파일 : ${req.file}`);
  logger.info(`요청.바디 : ${req.body}`);
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
  res.json({ url: photoUrl });
  // TODO : 정적 라우팅 설정 ㄱ
  // TODO : FE에서 url 받아 작성 완료 요청에 넣어주기
  // "url": "/uploads/cat1730356206573.jpg"
});

const upload2 = multer();

router
  .route("/")
  // GET /inquiry
  .get(async (req, res, next) => {
    try {
      const inquiries = await Inquiry.findAll();
      res.json(inquiries);
      // logger.info(inquiries);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  })
  // POST /inquiry
  .post(upload2.none(), async (req, res, next) => {
    // TODO : 파일 첨부 없는 경우 처리 마감하기
    // const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    try {
      const newInquiry = await Inquiry.create({
        user_id: 1, // TODO : 실제 값 가져오는 것으로 수정
        title: req.body.title,
        content: req.body.content,
        photo_url_1: req.body.url, // TODO : FE에서 넣어주기.
      });
      res.status(201).json(newInquiry);
      // logger.info(newInquiry);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  });

router
  // TODO : 없는 경우 처리를 좀 더 상세하게
  .route("/:inquiryId")
  .get(async (req, res, next) => {
    try {
      const inquiry = await Inquiry.findByPk(req.params.inquiryId);
      res.json(inquiry);
      // logger.info(inquiry);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  })
  // 문의글 수정, 삭제 기능은 제공하지 않을 예정이지만, 기본 형태 구현만 해둔다.
  .put(async (req, res, next) => {
    try {
      const inquiryId = Number(req.params.inquiryId);
      const updateData = req.body;
      const [updatedRowCount] = await Inquiry.update(updateData, {
        where: { inquiry_id: inquiryId },
      });

      if (updatedRowCount === 0) {
        return res.status(404).send("Inquiry not found");
      }

      res.send("inquiry updated successfully");
    } catch (error) {
      console.error(error.message);
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
      console.error(error.message);
      next(error);
    }
  });

module.exports = router;
