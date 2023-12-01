import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProfileSidebar() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    heartRate: '',
    vo2Max: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/userProfile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    

    fetchProfile();
  }, []);

  return (
    <div className="w-64 h-screen bg-blue-100 p-5 text-sm">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-blue-300 rounded-full mb-3"></div>
        <h2 className="font-bold mb-2">{profile.name}</h2>
        <span>{profile.age} years old</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Height</span>
          <span>{profile.height} cm</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Weight</span>
          <span>{profile.weight} kg</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Heart Rate</span>
          <span>{profile.heartRate} bpm</span>
        </div>
        <div className="flex items-center justify-between">
          <span>VO2 Max</span>
          <span>{profile.vo2Max} mL/kg</span>
        </div>
      </div>
    </div>
  );
}
