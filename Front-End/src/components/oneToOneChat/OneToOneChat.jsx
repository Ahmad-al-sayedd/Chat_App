import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import InputText from "./InputText";
import { UserContext } from "../../context";

const OneToOneChat = () => {
  const { chatId } = useParams();
  const { userId } = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [renderOption, setRenderOption] = useState(null);
  const [editedMessage, setEditedMessage] = useState(false);
  const [editedMessageContent, setEditedMessageContent] = useState({});

  // Fetch messages
  const renderingMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/chat/${chatId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/user/chat/message", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, content: newMessage.trim() }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const sentMessage = await response.json();
      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Edit message request
  const handleEditMessageRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/chat/message/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedMessageContent[id] }),
      });

      if (!response.ok) throw new Error("Failed to edit message");

      const sentMessage = await response.json();
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, content: sentMessage.content } : msg))
      );
      setEditedMessage(false);
      setRenderOption(null);
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle emoji click
  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  // Onchange for edited input
  const handleOnchangeEditedTxt = (e, id) => {
    setEditedMessageContent((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  useEffect(() => {
    renderingMessages();
  }, [chatId]);

  return (
    <div className="p-4 flex flex-col h-screen w-full">
      <div className="flex flex-col items-center justify-center w-full p-10 rounded-md overflow-y-auto space-y-2 mb-4">
        {messages.length === 0 ? (
          <p className="text-white font-bold text-2xl">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <section
              key={msg._id}
              className="flex justify-between bg-slate-200 p-6 rounded shadow text-sm w-3/5 hover:bg-slate-100 transition"
              onClick={() => setRenderOption(msg._id)}
            >
              <div className="w-full flex flex-col gap-2">
                <strong className="text-blue-900">{msg.sender?.userName}:</strong>

                {editedMessage && renderOption === msg._id ? (
                  <div className="w-full bg-white p-3 rounded shadow-inner space-y-3">
                    <input
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      value={editedMessageContent[msg._id]}
                      placeholder={msg.content}
                      onChange={(e) => handleOnchangeEditedTxt(e, msg._id)}
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditedMessage(false)}
                        className="px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleEditMessageRequest(msg._id)}
                        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-900">{msg.content}</span>
                )}
              </div>

              <div className="relative flex flex-col justify-center w-1/5 items-end">
                {/* Show options only if user owns the message */}
                {userId === msg.sender?._id && (
                  <>
                    <button
                      onClick={() => setShowOptions(!showOptions)}
                      className="text-xl"
                    >
                      {renderOption === msg._id && showOptions ? "⬆️" : "⬇️"}
                    </button>

                    {renderOption === msg._id && showOptions && (
                      <ul className="absolute right-0 top-8 z-10 w-32 bg-white border border-gray-300 rounded shadow-lg py-2 text-center space-y-2">
                        <li className="cursor-pointer hover:bg-gray-100">Delete</li>
                        <li
                          onClick={() => setEditedMessage(true)}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          Edit
                        </li>
                      </ul>
                    )}
                  </>
                )}
              </div>
            </section>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <InputText
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        setShowEmojiPicker={setShowEmojiPicker}
        showEmojiPicker={showEmojiPicker}
        handleEmojiClick={handleEmojiClick}
      />
    </div>
  );
};

export default OneToOneChat;
