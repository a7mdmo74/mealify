"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/nextjs";
import { Loader2, LogIn, X } from "lucide-react";
import { Logo } from "@/lib/static";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/AppContext";

type Props = {
  toggleSavedbar: () => void;
};

const Cartbar = ({ toggleSavedbar }: Props) => {
  const { userId } = useAuth();
  const { getSavedItems, savedData } = useAppContext();
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleRemoveItem = async (mealId: string) => {
    // Set loading for specific item
    setLoadingItems((prev) => ({ ...prev, [mealId]: true }));

    try {
      if (!userId) {
        console.error("User ID is required");
        return;
      }
      const response = await fetch("/api/saved", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
      if (response.status === 200) {
        toast.success("Item removed from saved items!", {
          position: "top-left",
        });
        if (userId) {
          await getSavedItems(userId);
        }
      }
    } catch (error) {
      toast.error("Failed to remove item!", {
        position: "top-left",
      });
      console.error("Error removing item:", error);
    } finally {
      // Clear loading state for specific item
      setLoadingItems((prev) => ({ ...prev, [mealId]: false }));
    }
  };
  return (
    <div className="fixed top-0 right-0 w-72 min-h-screen bg-white shadow-lg border-l border-gray-200">
      <div className="relative w-full h-full">
        <button
          onClick={toggleSavedbar}
          className="absolute top-0 left-0 text-white bg-red-500 hover:bg-red-700 p-2 rounded-br-xl"
        >
          <X size={24} />
        </button>
      </div>
      <div className="p-4 h-screen overflow-y-auto scrollbar-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image
              src={Logo}
              alt="logo"
              className="w-6"
              width={50}
              height={40}
            />
            <p className="text-xl font-bold text-headingColor">Saved</p>
          </Link>
        </div>
        <SignedIn>
          <div className="flex-1 pt-8">
            {savedData.length > 0 ? (
              <div className="flex flex-col gap-4">
                {savedData
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div key={item.mealId} className="flex items-center gap-4">
                      <Link
                        href={`/meal/${item.mealId}`}
                        className="flex items-center gap-4 flex-1"
                      >
                        <Image
                          src={item.strMealThumb}
                          alt={item.strMeal}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.strMeal}</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(item.mealId)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete saved item"
                      >
                        {loadingItems[item.mealId] ? (
                          <Loader2 size={24} className="animate-spin" />
                        ) : (
                          <X size={24} />
                        )}
                      </button>
                    </div>
                  ))}{" "}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-gray-50 rounded-full p-8 mb-4">
                  <Image
                    src={Logo}
                    alt="Empty cart"
                    className="w-16 h-16 opacity-50"
                    width={64}
                    height={64}
                  />
                </div>
                <p className="text-textColor font-medium">No Saved Items</p>
                <p className="text-gray-400 text-sm mt-2">
                  Add some delicious meals to your cart
                </p>
              </div>
            )}
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="bg-gray-50 rounded-full p-8 mb-6">
              <LogIn size={32} className="text-gray-400" />
            </div>
            <p className="text-textColor font-medium mb-2">
              Please login to view your cart
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Sign in to start ordering delicious meals
            </p>
            <SignInButton mode="modal">
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <LogIn size={16} />
                <span className="font-medium">Login</span>
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default Cartbar;
