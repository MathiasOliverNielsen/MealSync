// Recipe and meal-related types

export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
  extendedIngredients?: Ingredient[];
  cuisines?: string[];
  diets?: string[];
  sourceUrl?: string;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

export interface ShoppingListItem {
  name: string;
  amount: number;
  unit: string;
  count: number; // number of times this ingredient appears
}

export interface MealPlanEntry {
  day: string;
  recipe: Recipe | null;
}

export interface WeeklyMealPlan {
  [key: string]: Recipe | null;
}

export interface SearchFilters {
  query: string;
  ingredients?: string[];
  cuisine?: string;
  diet?: string;
}

export interface SpoonacularResponse<T> {
  results: T[];
  totalResults: number;
  offset: number;
  number: number;
}

export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export const WEEKDAYS: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
