import React, { useState, useEffect, useRef } from "react";
import client from "../api/client";
import SubmitBtn from "./form/SubmitBtn";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Fetch chat history from the server when the component mounts
    fetchChatHistory();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat container when chat history updates
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);

  const fetchChatHistory = async () => {
    try {
      const { data } = await client.get("/user/chat/history");
      setChatHistory(data.history.reverse()); // Reverse the chat history
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    setIsPending(true);
    e.preventDefault();
    try {
      const { data } = await client.post("/user/chat", { message });
      setChatHistory([
        ...chatHistory,
        { user: true, message },
        { user: false, message: data.message },
      ]);
      setIsPending(false);
    } catch (error) {
      console.error("Error submitting message:", error);
      setIsPending(false);
    }
    setMessage(""); // Clear the input field after submitting
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="absolute bg-primary p-2 w-[100%] text-center text-xs bottom-0">
        <form>
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="mr-2 indent-1 p-2 outline-none border border-gray-300 rounded-lg w-[70%]"
            placeholder="Tell me a good horror movie."
          />
          <SubmitBtn onclick={handleSubmit} value="Ask me!" busy={isPending} />
        </form>
      </div>
      <div
        className="w-[100%] overflow-y-auto max-h-[380px]"
        ref={chatContainerRef}
      >
        <div className="p-2">
          {chatHistory.map((chat, index) => (
            <div key={index} className="my-2 text-xs bg-white bg-opacity">
              {/* Render user message with border if user:true */}
              {chat.user && (
                <div className="border-t p-2 text-blue">
                  <span className="font-bold text-md">You: </span>
                  <span>{chat.message}</span>
                </div>
              )}
              {/* Render chatbot response with border if user:false */}
              {!chat.user && (
                <div className="p-2 text-red-400">
                  <span className="font-bold text-md">ScreenPal: </span>
                  <span>{chat.message}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
