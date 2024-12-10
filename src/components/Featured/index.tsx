"use client";
import { getAllCategories } from "@/lib/requests";
import { Category } from "@/lib/typing";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Featured = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        const shuffled = [...allCategories].sort(() => 0.5 - Math.random());
        const randomCategories = shuffled.slice(0, 10);
        setCategories(randomCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="mt-16">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">
            Featured Categories
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hidden gap-6 scroll-smooth"
          >
            {/* Category Cards */}
            {categories.map((category) => (
              <div
                key={category.idCategory}
                className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-[300px] flex flex-col items-center py-4 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={category.strCategoryThumb}
                    alt={`${category.strCategory} Category`}
                    className="object-cover"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {category.strCategory}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {category.strCategoryDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
