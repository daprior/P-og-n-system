import React, { useState, useEffect } from "react";
import Main from "components/layouts/Main";
import { TextInput, Button } from "@mantine/core";

export default function Testiframe() {
  const [message, setMessage] = useState("");
  const [chatlog, setChatlog] = useState([
    {
      sender: "Chatbot",
      message:
        "Jeg er en chatbot fra Bilforhandler Pedersen & Nielsen Automobiler. Hvordan kan jeg hjælpe dig i dag?",
    },
  ]);
  const [isSending, setIsSending] = useState(false); // Flag for at indikere, om en besked er ved at blive sendt

  const sendMessage = async () => {
    if (message.trim() === "") return;

    // Tilføj brugerens besked til chatloggen
    setChatlog((prevChatlog) => [...prevChatlog, { sender: "User", message }]);
    setMessage("");
    setIsSending(true); // Indstil flagget til at indikere, at beskeden er ved at blive sendt

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Error communicating with the chatbot");
      }

      const botResponse = await response.json();

      // Tilføj chatbottens svar til chatloggen
      setChatlog((prevChatlog) => [
        ...prevChatlog,
        { sender: "Chatbot", message: botResponse },
      ]);
    } catch (error) {
      console.error("Error communicating with the chatbot:", error);
    } finally {
      setIsSending(false); // Efter beskeden er sendt (eller der opstår en fejl), fjern flagget for at indikere, at beskeden er ved at blive sendt
    }
  };

  useEffect(() => {
    // Optionally, you can fetch initial chat messages or perform any other initialization here.
  }, []);

  return (
    <Main className="">
      <div className="font-bold mb-4">
        <h3>Chatbot</h3>
      </div>
      <div className="flex flex-col h-full bg-gray-100">
        <div className="flex-1 p-4 overflow-y-auto">
          {chatlog.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.sender === "User" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block rounded-lg p-4 ${
                  message.sender === "User"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {message.message}
              </div>
            </div>
          ))}
          {/* Vis en midlertidig besked, hvis en besked er ved at blive sendt */}
          {isSending && (
            <div className="text-center text-gray-500">Svarer....</div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200">
          <TextInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Skriv din besked her..."
            className="mb-4"
          />
          <Button
            onClick={sendMessage}
            className="bg-black"
            radius="sm"
            fullWidth
          >
            Send
          </Button>
        </div>
      </div>
    </Main>
  );
}
