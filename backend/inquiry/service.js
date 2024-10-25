const Inquiry = require("../models/inquiry");

// 모든 Inquiries 조회
// TODO : 본인 Inquiry만 조회하도록 수정 필요
async function getAllInquiries() {
  try {
    const inquiries = await Inquiry.findAll();
    return inquiries;
  } catch (error) {
    console.error("Error fetching inquiries:", error);
  }
}

// 특정 Inquiry 조회 (예: ID가 1인 경우)
// async function getInquiryById(id) {
//   try {
//     const inquiry = await Inquiry.findByPk(id);
//     if (inquiry) {
//       console.log(inquiry);
//     } else {
//       console.log(`Inquiry with ID ${id} not found.`);
//     }
//   } catch (error) {
//     console.error(`Error fetching inquiry with ID ${id}:`, error);
//   }
// }

// 예시 실행
// getAllInquiries();
// getInquiryById(1);

module.exports = {
  getAllInquiries,
  // getInquiryById,
};
