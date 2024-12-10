"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { Logo } from "@/lib/static";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 min-h-screen bg-white shadow-lg p-6 border-r border-gray-200">
      <Link href="/" className="flex items-center gap-2 mb-8 select-none">
        <Image src={Logo} alt="logo" className="w-6" width={50} height={40} />
        <p className="text-xl font-bold text-headingColor">Mealify</p>
      </Link>
      <h2 className="text-2xl font-bold text-headingColor mb-4">Menu</h2>
      <nav className="flex flex-col space-y-2">
        <Link
          href="/"
          className="py-3 px-4 text-base text-textColor rounded-lg hover:bg-gray-100 hover:text-headingColor duration-200 transition-all ease-in-out flex items-center gap-2"
        >
          Home
        </Link>
        <Link
          href="/menu"
          className="py-3 px-4 text-base text-textColor rounded-lg hover:bg-gray-100 hover:text-headingColor duration-200 transition-all ease-in-out flex items-center gap-2"
        >
          Menu
        </Link>
        <Link
          href="/about"
          className="py-3 px-4 text-base text-textColor rounded-lg hover:bg-gray-100 hover:text-headingColor duration-200 transition-all ease-in-out flex items-center gap-2"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="py-3 px-4 text-base text-textColor rounded-lg hover:bg-gray-100 hover:text-headingColor duration-200 transition-all ease-in-out flex items-center gap-2"
        >
          Contact Us
        </Link>
      </nav>
      <div className="absolute bottom-6 left-6">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-black border-2 px-4 py-2 rounded-md flex items-center gap-2">
              <LogIn size={14} />
              <span className="text-sm">Login</span>
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              variables: { colorPrimary: "#000" },
              elements: { avatarBox: "w-8 h-8" },
            }}
            showName
          />
        </SignedIn>
      </div>
    </div>
  );
};

export default Sidebar;
