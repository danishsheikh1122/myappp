'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import { SignInButton, useAuth, UserButton, useUser } from "@clerk/nextjs";
import axios from 'axios'; // Ensure axios is imported
import toast from "react-hot-toast";

function Header() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handleSignIn = async () => {
    if (!user) return;

    const name = user.firstName; // Use first name correctly
    const userId = user.id; // Use first name correctly
    const email = user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : null; // Get the primary email
    console.log(user)
    console.log(name)
    console.log(email)

    try {
      // Sending POST request to save user data
      const response = await axios.post('/api/users', {
        userId,
        name,
        email
      });

      if (response.status === 201) {
        toast.success('User signed in and saved successfully!');
      } else {
        toast.error('User sign-in successful, but there was an issue saving.');
      }
    } catch (error) {
      console.error('Error signing up and saving user:', error);
      toast.error('Error saving user. Please try again.');
    }
  };

  // Run handleSignIn whenever the user signs in
  useEffect(() => {
    if (isSignedIn) {
      handleSignIn();
    }
  }, [isSignedIn]);

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo and title */}
        <div className="flex items-center">
          <img
            src="/assets/shiva.png"
            alt="Athleticon logo"
            className="h-14 w-10"
          />
          <span className="ml-2 text-xl font-bold">Wellness360</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link href="/" className="text-gray-600">Home</Link>
          <Link href="/user-dashboard" className="text-gray-600">Dashboard</Link>
          <Link href="/exercise" className="text-gray-600">Exercises</Link>
          <Link href="/virtual-meetups" className="text-gray-600">Virtual Meetups</Link>
          <Link href="/games" className="text-gray-600">Games and Puzzles</Link>
          <Link href="/certificates" className="text-gray-600">Achievements</Link>
        </nav>

        {/* Sign In/User Button */}
        <div className="flex items-center">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="text-blue-500">Sign In</button>
            </SignInButton>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
