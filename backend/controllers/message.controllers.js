import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import ErrorHandler from "../utils/error.handler.js";

const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;

  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  await Promise.all([conversation.save(), newMessage.save()]);

  res.status(201).json({ message: "Message sent successfully", conversation });
};

const getMessages = async (req, res, next) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate("messages");

  if (!conversation) {
    return next(new ErrorHandler("No conversation found", 404));
  }

  const messages = conversation.messages;

  res.status(200).json(messages);
};

export default { sendMessage, getMessages };
