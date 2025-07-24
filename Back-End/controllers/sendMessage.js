import { Message, Chat } from "../models/user.js";

export const CreateMessage = async (req, res) => {
  const currentUserId = req.user._id;
  const { chatId, content } = req.body;

  try {
    if (!chatId || !content) {
      return res.status(400).json({ message: "chatId and content are required" });
    }

    // Step 1: Create the message
    const newMessage = await Message.create({
      sender: currentUserId,
      content,
      chat: chatId,
    });

    // Step 2: Populate sender and chat fields
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "userName email")
      .populate("chat");

    // Step 3: Update latestMessage in Chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: populatedMessage,
    });

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};




export const getMessage = async (req, res) => {

  const chatId = req.params.chatId; // Use lowercase route param for consistency

  try {
    if (!chatId) {
      return res.status(400).json({ message: "chatId is required" });
    }

    const result = await Message.find({ chat: chatId })
      .populate("sender", "userName email") // So you can show who sent each message
      .populate("chat");

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
