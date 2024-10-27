'use client'
import React from "react";
import Link from "next/link";
import { SignInButton, useAuth, UserButton, useUser } from "@clerk/nextjs";
function Header() {
  const { isSignedIn } = useAuth();
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <img
            src="/assest/shiva.png"
            alt="Athleticon logo"
            className="h-14 w-10"
          />
          <span className="ml-2 text-xl font-bold">Wellness360</span>
        </div>
        <nav className="flex space-x-6">
          <Link href="/" className="text-gray-600">
            Home
          </Link>
          <Link href="/user-dashboard" className="text-gray-600">
            DashBoard
          </Link>
          <Link href="/exercise" className="text-gray-600">
            Exercises
          </Link>
          <Link href="/virtual-meeetups" className="text-gray-600">
            Virtual Meetups
          </Link>
          <Link href="/games" className="text-gray-600">
            Games and Puzzles
          </Link>
          <Link href="/certificates" className="text-gray-600">
            Achhivements
          </Link>
        </nav>
        <div className="flex items-center">
          {!isSignedIn ? <SignInButton></SignInButton> : <UserButton></UserButton>}
        </div>
      </div>
    </header>
  );
}

export default Header;
