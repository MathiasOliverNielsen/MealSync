import { Meal, Category, Area, IngredientItem } from "@/lib/types";

async function fetchAPI<T>(type: string, params: Record<string, string> = {}): Promise<T | null> {
  try {
    const searchParams = new URLSearchParams({ type, ...params });
    const url = `/api/recipes?${searchParams.toString()}`;
    console.log("Calling API:", url);

    const response = await fetch(url);

    if (!response.ok) {
      console.error("API error:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    console.log("API response success:", type, data);
    return data as T;
  } catch (error) {
    console.error("API fetch error for", type, error);
    return null;
  }
}

export async function searchMealsByName(name: string): Promise<Meal[]> {
  const data = await fetchAPI<{ meals: Meal[] | null }>("search", { s: name });
  console.log("searchMealsByName result:", data?.meals?.length || 0);
  return data?.meals || [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const data = await fetchAPI<{ meals: Meal[] }>("meal", { i: id });
  console.log("getMealById result:", data?.meals?.[0]?.strMeal);
  return data?.meals?.[0] || null;
}

export async function getRandomMeal(): Promise<Meal | null> {
  const data = await fetchAPI<{ meals: Meal[] }>("random");
  console.log("getRandomMeal result:", data?.meals?.[0]?.strMeal);
  return data?.meals?.[0] || null;
}

export async function filterMealsByCategory(category: string): Promise<Meal[]> {
  const data = await fetchAPI<{ meals: Meal[] | null }>("filter", { c: category });
  console.log("filterMealsByCategory result:", data?.meals?.length || 0);
  return data?.meals || [];
}

export async function filterMealsByArea(area: string): Promise<Meal[]> {
  const data = await fetchAPI<{ meals: Meal[] | null }>("filter", { a: area });
  console.log("filterMealsByArea result:", data?.meals?.length || 0);
  return data?.meals || [];
}

export async function filterMealsByIngredient(ingredient: string): Promise<Meal[]> {
  const data = await fetchAPI<{ meals: Meal[] | null }>("filter", { i: ingredient });
  console.log("filterMealsByIngredient result:", data?.meals?.length || 0);
  return data?.meals || [];
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchAPI<{ categories: Category[] }>("categories");
  console.log("getCategories result:", data?.categories?.length || 0);
  return data?.categories || [];
}

export async function getAreas(): Promise<Area[]> {
  const data = await fetchAPI<{ areas: Area[] }>("areas");
  console.log("getAreas result:", data?.areas?.length || 0);
  return data?.areas || [];
}

export async function getIngredients(): Promise<IngredientItem[]> {
  const data = await fetchAPI<{ ingredients: IngredientItem[] }>("ingredients");
  console.log("getIngredients result:", data?.ingredients?.length || 0);
  return data?.ingredients || [];
}
