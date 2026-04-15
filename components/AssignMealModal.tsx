import { Meal, Weekday } from "@/lib/types";
import { Button } from "./Button";
import { Card } from "./Card";

interface AssignMealModalProps {
  meal: Meal | null;
  weekdays: Weekday[];
  onAssign: (day: Weekday) => void;
  onClose: () => void;
}

export function AssignMealModal({ meal, weekdays, onAssign, onClose }: AssignMealModalProps) {
  if (!meal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Assign {meal.strMeal} to a day</h2>
        <div className="space-y-2 mb-6">
          {weekdays.map((day) => (
            <Button key={day} variant="secondary" className="w-full" onClick={() => onAssign(day)}>
              {day}
            </Button>
          ))}
        </div>
        <Button variant="secondary" className="w-full" onClick={onClose}>
          Cancel
        </Button>
      </Card>
    </div>
  );
}
