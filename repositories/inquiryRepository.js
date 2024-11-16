// Repository는 데이터베이스와의 상호작용을 담당합니다.

const { Inquiry } = require("../models");

class InquiryRepository {
  async findAll() {
    return await Inquiry.findAll();
  }

  // 추가적인 데이터베이스 작업 메서드를 여기에 정의할 수 있습니다.
}

module.exports = new InquiryRepository();
