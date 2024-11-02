function chatRoutes(io) {
  console.log("chatRoutes loaded");

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
