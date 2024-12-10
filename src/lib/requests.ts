export const getAllCategories = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getMealsByCategory = async (category: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meals for category");
    }

    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    throw error;
  }
};

export const getMealByName = async (mealName: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meal details");
    }

    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching meal details:", error);
    throw error;
  }
};

export const getRandomMeal = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch random meal");
    }

    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching random meal:", error);
    throw error;
  }
};

export const getMealById = async (id: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meal by ID");
    }

    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    throw error;
  }
};

export const getMealsByFirstLetter = async (letter: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meals by first letter");
    }

    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching meals by first letter:", error);
    throw error;
  }
};

export const listAllMealAreas = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meal areas");
    }

    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching meal areas:", error);
    throw error;
  }
};

export const filterByMainIngredient = async (ingredient: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meals by ingredient");
    }

    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching meals by ingredient:", error);
    throw error;
  }
};
