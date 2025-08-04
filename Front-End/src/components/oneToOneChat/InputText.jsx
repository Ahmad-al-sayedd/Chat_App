import React from 'react'
import EmojiPicker from "emoji-picker-react";

const InputText = ({setShowEmojiPicker,sendMessage,newMessage,setNewMessage,showEmojiPicker,handleEmojiClick}) => {
  return (
    <div className="fixed bottom-0 right-0 w-[80%]">
    <div className="flex gap-2 items-center">
      {/* Message input field */}
      <input
        type="text"
        className="flex-1 p-2 border border-gray-300 rounded"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      {/* Toggle emoji picker */}
      <button
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="text-2xl px-2"
      >
        😊
      </button>

      {/* Send message button */}
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>

      {/* Emoji picker component */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  </div>
  )
}

export default InputText
