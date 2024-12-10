"use client";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import { getMealByName } from "@/lib/requests";
import Image from "next/image";
import { Meal } from "@/lib/typing";
import { Loader2 } from "../Loader";
import Link from "next/link";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await getMealByName(searchTerm);
      setMeals(results || []);
    } catch (error) {
      console.error("Error searching meals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-16">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Find Your Perfect Meal
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search meals..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-orange-300"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {isLoading && <Loader2 />}

        {!isLoading && hasSearched && meals.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">
              No meals found for {searchTerm}
            </p>
          </div>
        )}

        {!isLoading && meals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <Link href={`/meal/${meal.idMeal}`} key={meal.idMeal}>
                <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover rounded-lg"
                    width={500}
                    height={500}
                  />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {meal.strMeal}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-orange-100 rounded-full">
                        {meal.strCategory}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 rounded-full">
                        {meal.strArea}
                      </span>
                    </div>
                    {meal.strTags && (
                      <div className="flex flex-wrap gap-2">
                        {meal.strTags.split(",").map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
