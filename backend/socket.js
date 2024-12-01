import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import User from "./models/user.model.js";

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

const connectedUsers = {};

const updateOnlineStatus = async () => {
  try {
    const onlineUsers = await User.find({ isOnline: true });
    const maleCount = onlineUsers.filter(
      (user) => user.gender === "male"
    ).length;
    const femaleCount = onlineUsers.filter(
      (user) => user.gender === "female"
    ).length;

    io.emit("online-status", {
      total: onlineUsers.length,
      male: maleCount,
      female: femaleCount,
      onlineUsers,
    });
  } catch (error) {
    console.error("Error updating online status:", error.message);
  }
};

const handleDisconnect = async (userId) => {
  try {
    if (userId) {
      delete connectedUsers[userId];
      await User.findByIdAndUpdate(userId, { isOnline: false });
    }

    await updateOnlineStatus();
  } catch (error) {
    console.error("Error handling disconnect:", error.message);
  }
};

io.on("connection", async (socket) => {
  try {
    const userId = socket.handshake.query.userId;
    console.log("🚀 ~ io.on ~ userId:", userId);

    if (userId) {
      connectedUsers[userId] = socket.id;
      await User.findByIdAndUpdate(userId, { isOnline: true });
    }

    await updateOnlineStatus();

    socket.on("disconnect", () => handleDisconnect(userId));
  } catch (error) {
    console.error("Error during connection handling:", error.message);
  }
});

export const getReceiverSocketId = (receiverId) => {
  return connectedUsers[receiverId];
};

export const notificationMessage = (notication) => {
  io.emit("notification", notication);
};

export { app, io, server };
