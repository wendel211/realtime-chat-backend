// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

// cria servidor HTTP padrão
const server = http.createServer(app);

// instancia do socket.io com CORS liberado para o frontend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // endereço do frontend React
    methods: ["GET", "POST"],
  },
});

// eventos principais do socket
io.on("connection", (socket) => {
  console.log("🟢 Usuário conectado:", socket.id);

  // recebe mensagem do cliente
  socket.on("send_message", (data) => {
    console.log("💬 Mensagem recebida:", data);
    // envia para todos os clientes conectados
    io.emit("receive_message", data);
  });

  // quando o usuário desconectar
  socket.on("disconnect", () => {
    console.log("🔴 Usuário desconectado:", socket.id);
  });
});

// inicia o servidor
server.listen(3001, () => {
  console.log("✅ Servidor WebSocket rodando em http://localhost:3001");
});
