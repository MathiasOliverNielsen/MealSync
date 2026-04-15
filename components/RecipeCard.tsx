import Link from "next/link";
import { Meal } from "@/lib/types";
import { Card } from "./Card";

interface RecipeCardProps {
  meal: Meal;
  onAssign?: (meal: Meal) => void;
}

export function RecipeCard({ meal, onAssign }: RecipeCardProps) {
  return (
    <Card className="p-0 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{meal.strMeal}</h3>
        <div className="flex gap-2 mb-4 text-sm">
          <span className="text-gray-600">{meal.strCategory}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">{meal.strArea}</span>
        </div>
        <div className="flex gap-2 mt-auto">
          <Link href={`/recipes/${meal.idMeal}`} className="flex-1">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">View</button>
          </Link>
          {onAssign && (
            <button onClick={() => onAssign(meal)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium">
              Assign
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
