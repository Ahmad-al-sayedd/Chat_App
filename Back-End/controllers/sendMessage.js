import { Message, Chat, User } from "../models/user.js";

export const CreateMessage = async (req, res) => {
  const currentUserId = req.user._id;
  const { chatId, content } = req.body;

  try {
    if (!chatId || !content) {
      return res
        .status(400)
        .json({ message: "chatId and content are required" });
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

export const EditMessage = async (req, res) => {
  const userId = req.user._id;
  const { content } = req.body;
  const { messageId } = req.params;

  console.log(messageId);

  try {
    // Check for authentication
    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    // Validate input
    if (!content || !messageId) {
      return res.status(400).json({ message: "Missing content or message ID" });
    }

    // Find and update the message
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { content },
      { new: true } // Return the updated document
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error("Edit error:", error);
    res.status(500).json({ message: "Failed to edit message" });
  }
};

 export const deleteOneMessage = async (req, res) => {
  const {messageId} = req.params;
  console.log('messageId is', messageId);
  
  try {
    if (!messageId) {
      res.status(400).json({ message: "Message is not found" });
    }

    const deleteMessage = await Message.findByIdAndDelete( messageId );

    res.status(200).json({ message: "The message is deleted" });
    
  } catch (error) {
    console.log(error);
  }
};

