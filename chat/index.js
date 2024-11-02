function chatRoutes(io) {
  console.log("chatRoutes loaded");

  io.use((socket, next) => {
    const token = socket.handshake.auth.token; // 클라이언트에서 보낸 토큰 추출

    // 여기에서 토큰 검증 로직을 추가
    if (isValidToken(token)) {
      next(); // 인증 성공
    } else {
      next(new Error("Authentication error")); // 인증 실패
    }
  });

  // '/chat' 네임스페이스에서만 소켓 연결을 수신

  io.on("connection", (socket) => {
    console.log("A user connected to /chat namespace");

    socket.emit("welcome", "Welcome to the chat!");

    socket.on("message", (data) => {
      console.log("Message from client:", data);
      socket.emit("message", "Message received on the server.");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from /chat namespace");
    });
  });
}

module.exports = chatRoutes;
