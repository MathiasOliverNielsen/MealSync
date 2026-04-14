import { Recipe, SpoonacularResponse } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

if (!API_KEY) {
  console.warn("Spoonacular API key is not set. Please set NEXT_PUBLIC_SPOONACULAR_API_KEY in your environment variables.");
}

/**
 * Search recipes by name or ingredients
 */
export async function searchRecipes(query: string, number: number = 12, offset: number = 0): Promise<Recipe[]> {
  try {
    const params = new URLSearchParams({
      query,
      number: number.toString(),
      offset: offset.toString(),
      apiKey: API_KEY || "",
      addRecipeInformation: "true",
      fillIngredients: "true",
    });

    const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data: SpoonacularResponse<Recipe> = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching recipes:", error);
    return [];
  }
}

/**
 * Search recipes by ingredients
 */
export async function searchByIngredients(ingredients: string[], number: number = 12): Promise<Recipe[]> {
  try {
    const ingredientList = ingredients.join(",");
    const params = new URLSearchParams({
      ingredients: ingredientList,
      number: number.toString(),
      ranking: "2", // 2 = maximize used ingredients
      apiKey: API_KEY || "",
      addRecipeInformation: "true",
      fillIngredients: "true",
    });

    const response = await fetch(`${BASE_URL}/findByIngredients?${params}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error searching by ingredients:", error);
    return [];
  }
}

/**
 * Get recipe details by ID
 */
export async function getRecipeDetails(id: number): Promise<Recipe | null> {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY || "",
      includeNutrition: "false",
    });

    const response = await fetch(`${BASE_URL}/${id}/information?${params}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data: Recipe = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
}

/**
 * Get similar recipes
 */
export async function getSimilarRecipes(id: number, number: number = 6): Promise<Recipe[]> {
  try {
    const params = new URLSearchParams({
      number: number.toString(),
      apiKey: API_KEY || "",
    });

    const response = await fetch(`${BASE_URL}/${id}/similar?${params}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching similar recipes:", error);
    return [];
  }
}

/**
 * Get random recipes
 */
export async function getRandomRecipes(number: number = 12): Promise<Recipe[]> {
  try {
    if (!API_KEY) {
      console.error("Spoonacular API key is missing. Please set NEXT_PUBLIC_SPOONACULAR_API_KEY in your .env.local file.");
      return [];
    }

    const params = new URLSearchParams({
      number: number.toString(),
      apiKey: API_KEY,
    });

    const response = await fetch(`${BASE_URL}/random?${params}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    return [];
  }
}

/**
 * Autocomplete recipe search
 */
export async function autocompleteRecipeSearch(query: string, number: number = 10): Promise<{ id: number; title: string }[]> {
  try {
    const params = new URLSearchParams({
      query,
      number: number.toString(),
      apiKey: API_KEY || "",
    });

    const response = await fetch(`https://api.spoonacular.com/recipes/autocomplete?${params}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error autocompleting recipe search:", error);
    return [];
  }
}
