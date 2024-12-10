"use client";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LogIn, Menu, X, Star } from "lucide-react";
import Sidebar from "./Sidebar";
import Savedbar from "./Savedbar";
import { Logo } from "@/lib/static";
import { useState } from "react";

const Header = () => {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);

  const toggleSavedbar = () => {
    setIsSavedOpen(!isSavedOpen);
  };

  const toggleSidebar = () => {
    setIsSideOpen(!isSideOpen);
  };

  return (
    <header className="w-screen fixed z-50 bg-cardOverlay backdrop-blur-md p-3 md:px-4 lg:p-6 lg:px-16">
      {/* Desktop & Tablet */}
      <div className="hidden md:flex w-full justify-between items-center select-none">
        <Link href={"/"} className="flex items-center gap-2 select-none">
          <Image src={Logo} alt="logo" className="w-6" width={50} height={40} />
          <p className="text-xl font-bold text-headingColor">Mealify</p>
        </Link>
        <nav className="hidden md:flex flex-center gap-4">
          <Link
            href={"/"}
            className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out flex items-center gap-1"
          >
            Home
          </Link>
          <Link
            href={"/"}
            className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out flex items-center gap-1"
          >
            Menu
          </Link>
          <Link
            href={"/"}
            className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out flex items-center gap-1"
          >
            About Us
          </Link>
          <Link
            href={"/"}
            className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out flex items-center gap-1"
          >
            Contact Us
          </Link>
          <button
            title="saved"
            onClick={toggleSavedbar}
            className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out flex items-center gap-1"
          >
            <Star size={20} fill="#FA8931" color="#FA8931" />
          </button>
        </nav>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-black border-2 px-4 py-2 rounded-md flex-center gap-2">
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
      {/* Mobile */}
      <div className="flex md:hidden w-full justify-between items-center">
        <Link href={"/"} className="flex items-center gap-2 select-none">
          <Image src={Logo} alt="logo" className="w-6" width={50} height={40} />
          <p className="text-xl font-bold text-headingColor">Mealify</p>
        </Link>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleSavedbar}
            className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out flex items-center gap-1"
          >
            <Star size={20} fill="#FA8931" color="#FA8931" />
          </button>
          <button
            onClick={toggleSidebar}
            className="rounded-md hover:bg-gray-100 p-2"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute transition-all duration-300 ${
                  isSideOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                }`}
                size={24}
              />
              <X
                className={`absolute transition-all duration-300 ${
                  isSideOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                }`}
                size={24}
              />
            </div>
          </button>
        </div>
      </div>
      {/* Sidebar Component */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 border-r border-gray-200 transform transition-transform duration-300 ${
          isSideOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
      {/* Saved Component */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-6 border-l border-gray-200 transform transition-transform duration-300 ${
          isSavedOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Savedbar toggleSavedbar={toggleSavedbar} />
      </div>
    </header>
  );
};

export default Header;
