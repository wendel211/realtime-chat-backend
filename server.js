// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});


const users = new Map();

io.on("connection", (socket) => {
  console.log("🟢 Usuário conectado:", socket.id);

  socket.on("user_joined", (username) => {
    users.set(socket.id, username);
    console.log(`👋 ${username} entrou no chat`);
    io.emit("user_joined", username);
  });


  socket.on("send_message", (data) => {
    console.log("💬 Mensagem recebida:", data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    if (username) {
      console.log(`🚪 ${username} saiu do chat`);
      io.emit("user_left", username);
    } else {
      console.log("🔴 Usuário desconectado (sem nome):", socket.id);
    }
  });
});


server.listen(3001, () => {
  console.log("✅ Servidor WebSocket rodando em http://localhost:3001");
});
