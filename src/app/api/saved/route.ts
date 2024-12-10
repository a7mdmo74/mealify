import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const savedMeals = await prisma.savedMeal.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(savedMeals);
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      {
        error: "Error fetching saved meals",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { userId, mealId, strMeal, strMealThumb } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!mealId) {
      return NextResponse.json(
        { error: "Meal ID is required" },
        { status: 400 }
      );
    }

    if (!strMeal) {
      return NextResponse.json(
        { error: "Meal name is required" },
        { status: 400 }
      );
    }

    if (!strMealThumb) {
      return NextResponse.json(
        { error: "Meal thumbnail is required" },
        { status: 400 }
      );
    }

    const existingSavedMeal = await prisma.savedMeal.findFirst({
      where: {
        userId: userId,
        mealId: mealId,
      },
    });

    if (existingSavedMeal) {
      return NextResponse.json(
        { message: "Item already exists in the saved meals" },
        { status: 200 }
      );
    } else {
      const newSavedMeal = await prisma.savedMeal.create({
        data: {
          userId: userId,
          mealId: mealId,
          strMeal: strMeal,
          strMealThumb: strMealThumb,
          quantity: 1,
        },
      });

      return NextResponse.json(newSavedMeal);
    }
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      {
        error: "Error updating saved meals",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || !body.mealId) {
      return NextResponse.json(
        { error: "Meal ID is required" },
        { status: 400 }
      );
    }

    const { mealId } = body;

    const deletedMeal = await prisma.savedMeal.deleteMany({
      where: {
        mealId: mealId,
      },
    });

    return NextResponse.json(deletedMeal);
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      {
        error: "Error deleting saved meal",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
