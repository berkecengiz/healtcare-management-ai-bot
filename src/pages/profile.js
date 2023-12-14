// pages/profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    heartRate: '',
    vo2Max: '',
    bloodType: '',
    allergies: '',
    medications: '',
    medicalConditions: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/profile', {
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

  // Render the profile details
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <Header />
    <div className="flex-grow container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detailed view of personal information.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {/* Iterate over profile data to display each field */}
            {Object.entries(profile).map(([key, value]) => (
              <div key={key} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {value || 'Not specified'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ProfilePage;
