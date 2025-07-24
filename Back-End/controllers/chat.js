import { Chat } from "../models/user.js"; // Correct path

export const createChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ message: "userId is required" });

  try {
    const currentUserId = req.user._id;

    // Check if chat already exists
    let existingChat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [userId, currentUserId], $size: 2 },
    }).populate("users", "-password");

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    // If not found, create one
    const newChat = await Chat.create({
      isGroupChat: false,
      users: [userId, currentUserId],
    });

    const fullChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password"
    );

    res.status(201).json(fullChat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Failed to create chat" });
  }
};
