import { useState } from 'react';
// import axios or your preferred method for API requests

export default function CreateProfile() {
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    heartRate: "",
    vo2Max: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending data to your API
    // axios.post('/api/createProfile', profileData);
  };

  return (
    <div className="w-full h-screen bg-blue-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-5 text-sm rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-300 rounded-full mb-3"></div>
          <input 
            type="text" 
            name="name" 
            placeholder="Name"
            value={profileData.name}
            onChange={handleChange}
            className="text-center border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
          <input 
            type="number" 
            name="age" 
            placeholder="Age"
            value={profileData.age}
            onChange={handleChange}
            className="text-center border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <input 
            type="text" 
            name="height" 
            placeholder="Height"
            value={profileData.height}
            onChange={handleChange}
            className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
          <input 
            type="text" 
            name="weight" 
            placeholder="Weight"
            value={profileData.weight}
            onChange={handleChange}
            className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
          <input 
            type="text" 
            name="heartRate" 
            placeholder="Heart Rate"
            value={profileData.heartRate}
            onChange={handleChange}
            className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
          <input 
            type="text" 
            name="vo2Max" 
            placeholder="VO2 Max"
            value={profileData.vo2Max}
            onChange={handleChange}
            className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
          Create Profile
        </button>
      </form>
    </div>
  );
}
