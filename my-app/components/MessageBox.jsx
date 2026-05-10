'use client';

import React, { useEffect, useRef } from 'react';

function MessageBox({ chatMessages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="h-[400px] overflow-auto px-[20px]">
      <ul className="divide-y divide-gray-200">
        <li className="py-3">
          <span className="block text-green-800 font-bold">Groq:</span>
          <span className="block">Hi, I am Groq. How can I help you?</span>
        </li>
        {chatMessages.map((message, index) => {
          if (!message || !message.role) return null;
          return (
            <li className="py-3" key={index}>
              <span className={`block ${message.role === 'assistant' ? 'text-green-800' : 'text-blue-800'} font-bold`}>
                {message.role === 'assistant' ? 'Groq:' : 'You:'}
              </span>
              <span className="block">{message.content}</span>
            </li>
          );
        })}
      </ul>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageBox;