'use client';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { FaPencilAlt } from 'react-icons/fa'; // Importing the pencil icon from React Icons
import Image from 'next/image'
const UserProfile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    points: 0,
    age: null,
    bp: null,
    screen_time: 0
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  console.log(user)
  console.log(user.imageUrl)
  // Fetch user data
  const fetchUserData = async () => {
    try {
      console.log(user.id)
      const response = await axios.get(`/api/users?userId=${user.id}`);
      setProfile(response.data);
      console.log("profile", profile)
      setUserData(response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to fetch user data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  /* trunk-ignore(eslint/react-hooks/exhaustive-deps) */
  }, [user]);

  // Update user data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = {
        ...profile,
        screen_time: parseInt(profile.screen_time, 10) || 0, // Ensure screen_time is an integer
      };
  
      const response = await axios.put(`/api/users?userId=${user.id}`, updatedProfile);
  
      toast.success('Profile updated successfully!');
      setIsEditing(false); // Exit edit mode after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">User Profile</h1>

      <div className="border rounded-lg shadow-md p-6 mt-4">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            {/* Form Inputs */}
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Points:</label>
              <input
                type="number"
                name="points"
                value={profile.points}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Age:</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Blood Pressure:</label>
              <input
                type="text"
                name="bp"
                value={profile.bp}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Screen Time:</label>
              <input
                type="number"
                name="screen_time"
                value={profile.screen_time}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
              Update Profile
            </button>
          </form>
        ) : (
          <div>
            {/* Display User Info */}
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-4">
              <div className="flex justify-between items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={user?.imageUrl } // Fallback image if none provided
                    alt={`${userData?.name}'s profile picture`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{userData?.name}</h2>
                  {/* <span>{user?.imageUrl } </span> */}
                  <p className="text-gray-600">Email: {userData?.email}</p>
                  <p className="text-gray-600">Points: {userData?.points}</p>
                  <p className="text-gray-600">Age: {userData?.age}</p>
                  <p className="text-gray-600">Blood Pressure: {userData?.bp}</p>
                  <p className="text-gray-600">Screen Time: {userData?.screen_time}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  aria-label="Edit User"
                >
                  <FaPencilAlt className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
