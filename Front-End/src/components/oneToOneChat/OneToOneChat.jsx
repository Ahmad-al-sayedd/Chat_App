import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

const OneToOneChat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null); // for auto scroll
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [renderOption,setRenderOption]=useState(null)
  // Fetch all messages
  const renderingMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/chat/${chatId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      console.log("dataMessage", data);
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/user/chat/message", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          content: newMessage.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const sentMessage = await response.json();

      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };
  useEffect(() => {
    renderingMessages();
  }, [chatId]);

  return (
    <div className="p-4 flex  flex-col h-screen w-full">
      {/* Message List */}
      <div className="flex flex-col items-center justify-center  w-full 100 p-10 rounded-md overflow-y-auto space-y-2 mb-4">
        {messages.length === 0 ? (
          <p className="text-white font-bold text-2xl">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <section
              key={msg._id}
              className="flex justify-between bg-slate-200 p-8 rounded shadow text-sm w-3/5 overflow-hidden"
              onClick={()=>setRenderOption(msg._id)}
            >
              <div>
                {" "}
                <strong>{msg.sender?.userName}:</strong> {msg.content}
              </div>

              <div className=" flex flex-col justify-center  w-1/5">
                <button onClick={() => setShowOptions(!showOptions)}>
                  {showOptions ? "⬆️" : "⬇️"}
                </button>
                {(renderOption===msg._id && showOptions )&&(
                  <ul className="  h-[100px] flex justify-center  flex-col gap-4 items-center  bg-red-500">
                    <li>Delete</li>
                    <li>Edit</li>
                  </ul>
                )}
              </div>
            </section>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      {/* Input Section */}
      <div className="relative">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-2xl px-2"
          >
            😊
          </button>
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-16 right-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneToOneChat;
