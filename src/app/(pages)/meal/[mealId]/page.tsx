import Header from "@/components/Header";
import Image from "next/image";
import { getMealById } from "@/lib/requests";
import { Meal } from "@/lib/typing";
import { YoutubeIcon } from "lucide-react";
import Link from "next/link";

export default async function MealPage({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) {
  const mealId = (await params).mealId;

  const mealDetails: Meal = await getMealById(mealId);
  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((num) => ({
      ingredient: mealDetails[`strIngredient${num}` as keyof Meal],
      measure: mealDetails[`strMeasure${num}` as keyof Meal],
    }))
    .filter((item) => item.ingredient && item.ingredient.trim() !== "");

  return (
    <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary">
      <Header />

      <main className="mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4 w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src={mealDetails.strMealThumb}
                alt={mealDetails.strMeal}
                fill
                className="object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{mealDetails.strMeal}</h1>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full">
                  {mealDetails.strCategory}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {mealDetails.strArea}
                </span>
              </div>

              <div className="flex gap-4">
                {mealDetails.strYoutube && (
                  <Link
                    href={mealDetails.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <YoutubeIcon size={20} />
                    Watch Tutorial
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <p className="whitespace-pre-line text-gray-700">
              {mealDetails.strInstructions}
            </p>
          </div>

          {/* Ingredients */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ingredients.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between"
                >
                  <span className="font-medium">{item.ingredient}</span>
                  <span className="text-gray-600">{item.measure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
