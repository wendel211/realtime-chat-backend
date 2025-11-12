// test-client.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("🧩 Conectado ao servidor com ID:", socket.id);
  socket.emit("send_message", { user: "Tester", message: "Olá servidor!" });
});

socket.on("receive_message", (data) => {
  console.log("📨 Mensagem recebida:", data);
});
