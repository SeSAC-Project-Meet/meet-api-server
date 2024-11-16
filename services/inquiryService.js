const inquiryRepository = require("../repositories/inquiryRepository");

class InquiryService {
  async getAllInquiries() {
    return await inquiryRepository.findAll();
  }

  // 추가적인 비즈니스 로직 메서드를 여기에 정의할 수 있습니다.
}

module.exports = new InquiryService();
