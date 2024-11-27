import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

io.on("connection", (socket) => {
  // Kullanıcı ID'si socket bağlantısındaki query'den alınıyor.
  const userId = socket.handshake.query.userId;

  // Eğer userId mevcutsa, bu kullanıcı ID'sini socket ID'si ile ilişkilendiriyor.
  if (userId) {
    users[userId] = socket.id;
  }

  // Tüm online kullanıcıların listesi, bağlı olan istemcilere gönderiliyor.
  io.emit("getOnlineUsers", Object.keys(users));

  // İstemci bağlantısı kesildiğinde olay dinleniyor.
  socket.on("disconnect", () => {
    // Kesilen bağlantının kullanıcı ID'sini users nesnesinden kaldırıyor.
    delete users[userId];

    // Güncellenmiş online kullanıcı listesini tüm bağlı istemcilere gönderiyor.
    io.emit("getonline", Object.keys(users));
  });
});
export { app, io, server };
