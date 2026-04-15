import { Meal, Weekday, WeeklyMealPlan, WEEKDAYS, ShoppingListItem } from "@/lib/types";
import { extractIngredients, mergeIngredients } from "./ingredients";
import { getRandomMeal } from "@/lib/api/themealdb";

const MEAL_PLAN_KEY = "mealSync_mealPlan";
const SHOPPING_LIST_KEY = "mealSync_shoppingList";

export function initializeMealPlan(): WeeklyMealPlan {
  return {
    Monday: undefined,
    Tuesday: undefined,
    Wednesday: undefined,
    Thursday: undefined,
    Friday: undefined,
    Saturday: undefined,
    Sunday: undefined,
  };
}

export function loadMealPlanFromStorage(): WeeklyMealPlan {
  if (typeof window === "undefined") return initializeMealPlan();

  try {
    const stored = localStorage.getItem(MEAL_PLAN_KEY);
    return stored ? JSON.parse(stored) : initializeMealPlan();
  } catch {
    return initializeMealPlan();
  }
}

export function saveMealPlanToStorage(plan: WeeklyMealPlan): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(plan));
}

export function assignMealToDay(plan: WeeklyMealPlan, day: Weekday, meal: Meal): WeeklyMealPlan {
  return {
    ...plan,
    [day]: meal,
  };
}

export function removeMealFromDay(plan: WeeklyMealPlan, day: Weekday): WeeklyMealPlan {
  return {
    ...plan,
    [day]: undefined,
  };
}

export async function generateRandomWeek(): Promise<WeeklyMealPlan> {
  const plan = initializeMealPlan();
  const usedIds = new Set<string>();

  for (const day of WEEKDAYS) {
    let meal: Meal | null = null;
    let attempts = 0;

    while (!meal && attempts < 10) {
      const randomMeal = await getRandomMeal();
      if (randomMeal && !usedIds.has(randomMeal.idMeal)) {
        meal = randomMeal;
        usedIds.add(meal.idMeal);
      }
      attempts++;
    }

    if (meal) {
      plan[day] = meal;
    }
  }

  return plan;
}

export function consolidateShoppingList(plan: WeeklyMealPlan): ShoppingListItem[] {
  const allIngredients = WEEKDAYS.reduce(
    (acc, day) => {
      const meal = plan[day];
      if (meal) {
        acc.push(...extractIngredients(meal));
      }
      return acc;
    },
    [] as ReturnType<typeof extractIngredients>,
  );

  return mergeIngredients(allIngredients);
}

export function saveShoppingListToStorage(list: ShoppingListItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(list));
}

export function loadShoppingListFromStorage(): ShoppingListItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(SHOPPING_LIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(MEAL_PLAN_KEY);
  localStorage.removeItem(SHOPPING_LIST_KEY);
}
