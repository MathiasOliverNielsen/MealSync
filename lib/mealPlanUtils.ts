import { Recipe, WeeklyMealPlan, ShoppingListItem, Ingredient, Weekday, WEEKDAYS } from "./types";

const STORAGE_KEY = "mealSync_mealPlan";
const SHOPPING_LIST_KEY = "mealSync_shoppingList";

/**
 * Initialize an empty weekly meal plan
 */
export function initializeMealPlan(): WeeklyMealPlan {
  const plan: WeeklyMealPlan = {};
  WEEKDAYS.forEach((day) => {
    plan[day] = null;
  });
  return plan;
}

/**
 * Load meal plan from localStorage
 */
export function loadMealPlanFromStorage(): WeeklyMealPlan {
  if (typeof window === "undefined") return initializeMealPlan();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading meal plan from storage:", error);
  }

  return initializeMealPlan();
}

/**
 * Save meal plan to localStorage
 */
export function saveMealPlanToStorage(plan: WeeklyMealPlan): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch (error) {
    console.error("Error saving meal plan to storage:", error);
  }
}

/**
 * Assign a recipe to a specific weekday
 */
export function assignRecipeToDay(plan: WeeklyMealPlan, day: Weekday, recipe: Recipe): WeeklyMealPlan {
  return {
    ...plan,
    [day]: recipe,
  };
}

/**
 * Remove a recipe from a specific weekday
 */
export function removeRecipeFromDay(plan: WeeklyMealPlan, day: Weekday): WeeklyMealPlan {
  return {
    ...plan,
    [day]: null,
  };
}

/**
 * Generate a random weekly meal plan without duplicates
 * Fetches random recipes and ensures no recipe ID is repeated
 */
export async function generateRandomWeeklyPlan(getRandomRecipes: (count: number) => Promise<Recipe[]>): Promise<WeeklyMealPlan> {
  const plan = initializeMealPlan();
  const usedRecipeIds = new Set<number>();
  const recipes: Recipe[] = [];

  // Fetch more recipes than needed to handle duplicates
  const fetchedRecipes = await getRandomRecipes(20);

  // Filter out duplicates by recipe ID
  for (const recipe of fetchedRecipes) {
    if (!usedRecipeIds.has(recipe.id)) {
      recipes.push(recipe);
      usedRecipeIds.add(recipe.id);
      if (recipes.length === WEEKDAYS.length) break;
    }
  }

  // If we don't have enough unique recipes, fetch more
  if (recipes.length < WEEKDAYS.length) {
    const moreRecipes = await getRandomRecipes(10);
    for (const recipe of moreRecipes) {
      if (!usedRecipeIds.has(recipe.id)) {
        recipes.push(recipe);
        usedRecipeIds.add(recipe.id);
        if (recipes.length === WEEKDAYS.length) break;
      }
    }
  }

  // Assign recipes to weekdays
  WEEKDAYS.forEach((day, index) => {
    if (index < recipes.length) {
      plan[day] = recipes[index];
    }
  });

  saveMealPlanToStorage(plan);
  return plan;
}

/**
 * Consolidate ingredients from all recipes in the meal plan
 * Merges duplicate ingredients and returns a shopping list
 *
 * How it works:
 * 1. Extract all ingredients from recipes assigned to each day
 * 2. Normalize ingredient names (lowercase, trim whitespace)
 * 3. For each unique ingredient, sum up quantities with the same unit
 * 4. Return a consolidated array of shopping list items
 */
export function consolidateShoppingList(plan: WeeklyMealPlan): ShoppingListItem[] {
  const ingredientMap = new Map<string, { amount: number; unit: string; count: number }>();

  // Iterate through all weekdays and their recipes
  Object.values(plan).forEach((recipe) => {
    if (!recipe || !recipe.extendedIngredients) return;

    recipe.extendedIngredients.forEach((ingredient) => {
      // Normalize the ingredient name
      const normalizedName = ingredient.name.toLowerCase().trim();
      const unit = ingredient.unit.toLowerCase().trim();
      const key = `${normalizedName}|${unit}`;

      if (ingredientMap.has(key)) {
        const existing = ingredientMap.get(key)!;
        existing.amount += ingredient.amount;
        existing.count += 1;
      } else {
        ingredientMap.set(key, {
          amount: ingredient.amount,
          unit: ingredient.unit,
          count: 1,
        });
      }
    });
  });

  // Convert map to array of ShoppingListItem
  const shoppingList: ShoppingListItem[] = Array.from(ingredientMap.entries()).map(([key, value]) => {
    const [name] = key.split("|");
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
      amount: Math.round(value.amount * 100) / 100, // Round to 2 decimals
      unit: value.unit,
      count: value.count,
    };
  });

  // Sort alphabetically by name
  return shoppingList.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Save shopping list to localStorage
 */
export function saveShoppingListToStorage(list: ShoppingListItem[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(list));
  } catch (error) {
    console.error("Error saving shopping list to storage:", error);
  }
}

/**
 * Load shopping list from localStorage
 */
export function loadShoppingListFromStorage(): ShoppingListItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(SHOPPING_LIST_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading shopping list from storage:", error);
  }

  return [];
}

/**
 * Clear all stored data
 */
export function clearAllStoredData(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SHOPPING_LIST_KEY);
  } catch (error) {
    console.error("Error clearing stored data:", error);
  }
}
