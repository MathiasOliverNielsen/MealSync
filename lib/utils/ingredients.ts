import { Meal, Ingredient, ShoppingListItem } from "@/lib/types";

export function extractIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    const ingredient = meal[ingredientKey] as string | undefined;
    const measure = meal[measureKey] as string | undefined;

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim().toLowerCase(),
        measure: measure?.trim() || "to taste",
      });
    }
  }

  return ingredients;
}

export function mergeIngredients(allIngredients: Ingredient[]): ShoppingListItem[] {
  const merged: Record<string, ShoppingListItem> = {};

  allIngredients.forEach(({ name, measure }) => {
    const key = name.toLowerCase();

    if (merged[key]) {
      merged[key].count += 1;
    } else {
      merged[key] = {
        name,
        measure,
        count: 1,
      };
    }
  });

  return Object.values(merged).sort((a, b) => a.name.localeCompare(b.name));
}

export function generateShoppingList(allIngredients: Ingredient[]): ShoppingListItem[] {
  return mergeIngredients(allIngredients);
}
