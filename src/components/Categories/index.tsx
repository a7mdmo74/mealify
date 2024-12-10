"use client";
import { Meals, Category, CartItem } from "@/lib/typing";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getAllCategories, getMealsByCategory } from "@/lib/requests";
import { Loader2, Star } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";

type Props = {
  getSavedItems: (userId: string | null) => Promise<void>;
  savedData: CartItem[];
};

const Categories = ({ getSavedItems, savedData }: Props) => {
  const { userId } = useAuth();

  const [meals, setMeals] = useState<Meals[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Beef");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingToSaved, setAddingToSaved] = useState<string | null>(null);

  const handleSaved = async (
    userId: string,
    mealId: string,
    strMeal: string,
    strMealThumb: string,
    quantity: number
  ) => {
    if (!userId) {
      console.error("User ID is required");
      return;
    }

    setAddingToSaved(mealId);
    try {
      const isItemSaved = savedData.some((item) => item.mealId === mealId);

      if (isItemSaved) {
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

        // Move getSavedItems call here before the toast
        if (userId) {
          await getSavedItems(userId);
        }

        toast.success("Item removed from saved items!", {
          position: "top-left",
          autoClose: 3000,
        });
      } else {
        const response = await fetch("/api/saved", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            mealId,
            strMeal,
            strMealThumb,
            quantity,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            `Failed to save item: ${errorData?.message || response.statusText}`
          );
        }

        // Move getSavedItems call here before the toast
        if (userId) {
          await getSavedItems(userId);
        }

        toast.success("Item saved successfully!", {
          position: "top-left",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error handling saved item:", error);
      toast.error(
        error instanceof Error ? error.message : "An error occurred",
        {
          position: "top-left",
          autoClose: 5000,
        }
      );
    } finally {
      setAddingToSaved(null);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMealsByCategory = async () => {
      setLoading(true);
      try {
        const mealsData = await getMealsByCategory(selectedCategory);
        setMeals(mealsData);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealsByCategory();
  }, [selectedCategory]);
  return (
    <section className="py-16 bg-[#F5EEE9]">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.idCategory}
            onClick={() => setSelectedCategory(category.strCategory)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.strCategory
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 p-4 md:p-8 rounded-xl">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="h-full flex flex-col bg-white rounded-lg shadow-md"
            >
              <Link href={`/meal/${meal.idMeal}`}>
                <Image
                  className="h-48 w-full object-cover rounded-lg"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={300}
                  height={300}
                />
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {meal.strMeal.slice(0, 28)}
                </h2>
                {userId ? (
                  <div className="flex justify-between items-center mt-2">
                    <button
                      className="mt-2 px-4 py-2"
                      onClick={() =>
                        handleSaved(
                          userId,
                          meal.idMeal,
                          meal.strMeal,
                          meal.strMealThumb,
                          1
                        )
                      }
                      disabled={addingToSaved === meal.idMeal}
                    >
                      {addingToSaved === meal.idMeal ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Star
                          size={18}
                          fill={
                            savedData.some(
                              (item) => item.mealId === meal.idMeal
                            )
                              ? "#FA8931"
                              : "none"
                          }
                          color={
                            savedData.some(
                              (item) => item.mealId === meal.idMeal
                            )
                              ? "#FA8931"
                              : "black"
                          }
                        />
                      )}
                    </button>
                    <Link href={`/meal/${meal.idMeal}`}>
                      <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                        View Recipe
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/sign-in">
                    <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                      Sign in to Save
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
