// Import necessary hooks and axios
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProfileSidebar from './ProfileSidebar';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userProfile, setUserProfile] = useState({}); // State for user profile

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/userProfile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  useEffect(() => {


    fetchProfile();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user's question to the chat
    const newUserMessage = { text: inputValue, sender: 'user' };
    setMessages(messages => [...messages, newUserMessage]);

    try {
        // Call OpenAI API for a response
        const token = localStorage.getItem('token');
        const profile = await axios.get('/api/userProfile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!profile) {
            throw new Error('User profile not found');
        }
        console.log("Profile:", profile);
        const response = await axios.post('/api/openai', {
            userProfile: userProfile, // Assuming userProfile state is already fetched and stored
            userQuestion: inputValue
        });
        console.log("OpenAI Response:", response);

        if (response.data.choices && response.data.choices.length > 0) {
            const aiResponse = response.data.choices[0].message.content.trim();
            console.log("AI Response:", aiResponse);

            // Add GPT response to the chat
            const newAiMessage = { text: aiResponse, sender: 'ai' };
            setMessages(messages => [...messages, newAiMessage]);
        } else {
            console.error('No AI response found in the OpenAI API response.');
        }
    } catch (error) {
        console.error('Error in OpenAI API call:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else {
            console.error('Error message:', error.message);
        }
    }

    setInputValue('');
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
