/**
 * Utility functions for ingredient extraction and merging
 */

export interface Ingredient {
  name: string;
  measure: string;
  count: number;
}

/**
 * Extract ingredients from TheMealDB meal data
 * Handles the strIngredient1-20 and strMeasure1-20 format
 */
export function extractIngredients(mealData: any): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientName = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];

    // Skip empty or null values
    if (!ingredientName || ingredientName.trim() === "") {
      continue;
    }

    ingredients.push({
      name: ingredientName.trim().toLowerCase(),
      measure: measure?.trim() || "",
      count: 1,
    });
  }

  return ingredients;
}

/**
 * Merge ingredients list to consolidate duplicates
 * Examples:
 * - "onion" + "onion" → "onion x2"
 * - "2 cups onion" + "1 cup onion" → "3 cups onion"
 * - "onion" + "2 cups onion" → "onion x2" (fallback to count-based)
 */
export function mergeIngredients(allIngredients: Ingredient[]): Ingredient[] {
  // Group by ingredient name and measure
  const grouped: { [key: string]: Ingredient } = {};

  for (const ingredient of allIngredients) {
    // Create a key for grouping: "name|measure"
    const key = `${ingredient.name}|${ingredient.measure}`;

    if (grouped[key]) {
      grouped[key].count += 1;
    } else {
      grouped[key] = { ...ingredient };
    }
  }

  // Convert grouped object to array
  return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Format ingredient for display
 * Examples:
 * - name: "onion", measure: "", count: 2 → "Onion x2"
 * - name: "onion", measure: "2 cups", count: 1 → "2 cups Onion"
 * - name: "onion", measure: "2 cups", count: 2 → "4 cups Onion"
 */
export function formatIngredient(ingredient: Ingredient): {
  name: string;
  quantity: string;
} {
  const capitalizedName = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);

  let quantity = "";

  if (ingredient.measure) {
    // Try to extract number from measure and multiply by count
    const numberMatch = ingredient.measure.match(/^([\d.]+)\s*(.*)$/);
    if (numberMatch && ingredient.count > 1) {
      const num = parseFloat(numberMatch[1]) * ingredient.count;
      const unit = numberMatch[2];
      quantity = `${num}${unit ? " " + unit : ""}`;
    } else {
      quantity = ingredient.measure;
      if (ingredient.count > 1) {
        quantity += ` x${ingredient.count}`;
      }
    }
  } else {
    // No measure, just show count
    if (ingredient.count > 1) {
      quantity = `x${ingredient.count}`;
    }
  }

  return { name: capitalizedName, quantity };
}
