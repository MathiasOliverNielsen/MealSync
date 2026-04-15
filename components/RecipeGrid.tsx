import { Meal } from "@/lib/types";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  meals: Meal[];
  onAssign?: (meal: Meal) => void;
}

export function RecipeGrid({ meals, onAssign }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} onAssign={onAssign} />
      ))}
    </div>
  );
}
