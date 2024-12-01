import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket.js";

const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  try {
    // Önce mevcut sohbeti bulalım
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Eğer sohbet yoksa, yeni bir sohbet oluşturalım
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Yeni mesajı oluşturalım
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId", "name email picture")
      .populate("receiverId", "name email picture");

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    return res.status(201).json({
      message: "Message sent successfully",
      newMessage: populatedMessage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res, next) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate({
    path: "messages",
    populate: {
      path: "senderId receiverId",
      select: "name email picture",
    },
  });
  if (!conversation) return res.status(200).json([]);

  const messages = conversation.messages;

  return res.status(200).json(messages);
};

export default { sendMessage, getMessages };
