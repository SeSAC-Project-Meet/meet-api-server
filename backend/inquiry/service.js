// const Inquiry = require("../models/inquiry");
//
// // 문의글 전체 조회
// // TODO : 본인 Inquiry만 조회하도록 수정 필요
// async function getAllInquiries() {
//   try {
//     const inquiries = await Inquiry.findAll();
//     return inquiries;
//   } catch (error) {
//     console.error("Error fetching inquiries:", error);
//   }
// }
//
// // 문의글 1개 조회
// async function getInquiryById(id) {
//   try {
//     const inquiry = await Inquiry.findByPk(id);
//     if (inquiry) {
//       // console.log(inquiry);
//       return inquiry;
//     } else {
//       // console.log(`Inquiry with ID ${id} not found.`);
//       return null;
//     }
//   } catch (error) {
//     console.error(`Error fetching inquiry with ID ${id}:`, error);
//   }
// }
//
// // 문의글 작성
// async function createInquiry(inquiryData) {
//   try {
//     const newInquiry = await Inquiry.create(inquiryData);
//     return newInquiry;
//   } catch (error) {
//     console.error("Error creating inquiry:", error);
//   }
// }
//
// module.exports = {
//   getAllInquiries,
//   getInquiryById,
//   createInquiry,
// };
