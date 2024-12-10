"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { CartItem, Meal } from "@/lib/typing";
import { AppContext } from "@/context/AppContext";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAuth();
  const [cartData, setCartData] = useState<Meal[]>([]);
  const [savedData, setSavedData] = useState<CartItem[]>([]);

  const getSavedItems = async (userId: string | null) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const response = await fetch(`/api/saved?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }

    const data = await response.json();
    setSavedData(data);
  };

  useEffect(() => {
    if (userId) {
      getSavedItems(userId);
    }
  }, [userId]);

  return (
    <AppContext.Provider
      value={{
        cartData,
        savedData,
        getSavedItems,
        setCartData,
        setSavedData,
      }}
    >
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </AppContext.Provider>
  );
}
