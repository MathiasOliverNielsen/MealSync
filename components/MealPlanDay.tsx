import { Meal, Weekday } from "@/lib/types";
import { Button } from "./Button";
import { Card } from "./Card";

interface MealPlanDayProps {
  day: Weekday;
  meal: Meal | undefined;
  onRemove: () => void;
  onReplace: () => void;
}

export function MealPlanDay({ day, meal, onRemove, onReplace }: MealPlanDayProps) {
  return (
    <Card className="flex flex-col h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{day}</h3>
      {meal ? (
        <>
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-32 object-cover rounded mb-3" />
          <h4 className="font-bold text-gray-900 mb-2">{meal.strMeal}</h4>
          <p className="text-sm text-gray-600 mb-4">{meal.strCategory}</p>
          <div className="flex gap-2 mt-auto">
            <Button variant="secondary" size="sm" className="flex-1" onClick={onReplace}>
              Replace
            </Button>
            <Button variant="secondary" size="sm" className="flex-1" onClick={onRemove}>
              Remove
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-500 text-center py-8 flex-1 flex items-center justify-center">No meal assigned</p>
          <Button onClick={onReplace} className="w-full">
            Add Meal
          </Button>
        </>
      )}
    </Card>
  );
}
