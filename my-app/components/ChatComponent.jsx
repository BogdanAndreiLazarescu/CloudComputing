'use client';

import React, { useState } from 'react';
import MessageBox from '@/components/MessageBox';

function ChatComponent() {
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      if (userInput.length === 0) return;

      const currentMessageObject = { role: 'user', content: userInput };
      const updatedMessages = [...chatMessages, currentMessageObject];
      setChatMessages(updatedMessages);
      setUserInput('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedMessages, type: 'user' }),
        });
        const json = await response.json();
        if (json.message) {
          setChatMessages(prev => [...prev, json.message]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto my-10">
      <div className="border border-b-0 rounded-lg border-gray-300">
        <div className="border-b text-center px-[20px] py-[10px]">
          <span className="text-md font-bold text-gray-900">
            Groq Chatbot
          </span>
        </div>
        <MessageBox chatMessages={chatMessages} />
      </div>
      <input
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        disabled={isLoading}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-4"
        placeholder={isLoading ? 'Waiting for response...' : 'Type something...'}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default ChatComponent;