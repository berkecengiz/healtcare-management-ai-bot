// Import useState from React
import { useState } from 'react';
// Import ProfileSidebar component
import ProfileSidebar from './ProfileSidebar';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');
    // TODO: Add OpenAI API call here
  };

  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-grow overflow-auto p-4 space-y-2">
          {messages.map((message, index) => (
            <div key={index} className={`rounded-lg p-2 text-white max-w-xs mx-2 ${message.sender === 'user' ? 'bg-blue-500 self-end' : 'bg-gray-300 self-start text-black'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex p-4 bg-blue-100">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 rounded-full p-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full">Send</button>
        </form>
      </div>
    </div>
  );
}
