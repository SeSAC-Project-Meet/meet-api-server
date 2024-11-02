// logger.js
const winston = require("winston");

// 로거 설정
const logger = winston.createLogger({
  level: "info", // 기본 로그 레벨
  format: winston.format.combine(
    winston.format.timestamp(), // 타임스탬프 추가
    winston.format.json() // JSON 형식으로 출력
  ),
  transports: [
    new winston.transports.Console(), // 콘솔에 로그 출력
    new winston.transports.File({ filename: "error.log", level: "error" }), // 에러 로그를 파일에 기록
    new winston.transports.File({ filename: "combined.log" }), // 모든 로그를 파일에 기록
  ],
});

module.exports = logger; // 다른 모듈에서 사용 가능하도록 내보내기
