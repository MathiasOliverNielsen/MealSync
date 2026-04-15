import { Meal } from "@/lib/types";
import { extractIngredients } from "@/lib/utils/ingredients";
import { Card } from "./Card";

interface IngredientListProps {
  meal: Meal;
}

export function IngredientList({ meal }: IngredientListProps) {
  const ingredients = extractIngredients(meal);

  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h3>
      <ul className="space-y-2">
        {ingredients.map((ingredient, idx) => (
          <li key={idx} className="flex justify-between text-gray-700">
            <span className="capitalize">{ingredient.name}</span>
            <span className="text-gray-600">{ingredient.measure}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
