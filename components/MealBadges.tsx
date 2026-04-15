import { Meal } from "@/lib/types";

interface MealBadgesProps {
  meal: Meal;
}

export function MealBadges({ meal }: MealBadgesProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{meal.strCategory}</span>
      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{meal.strArea}</span>
    </div>
  );
}
