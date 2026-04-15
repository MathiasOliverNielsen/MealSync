import { WeeklyMealPlan, Weekday, WEEKDAYS } from "@/lib/types";
import { MealPlanDay } from "./MealPlanDay";

interface MealPlanGridProps {
  plan: WeeklyMealPlan;
  onRemove: (day: Weekday) => void;
  onReplace: (day: Weekday) => void;
}

export function MealPlanGrid({ plan, onRemove, onReplace }: MealPlanGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {WEEKDAYS.map((day) => (
        <MealPlanDay key={day} day={day} meal={plan[day]} onRemove={() => onRemove(day)} onReplace={() => onReplace(day)} />
      ))}
    </div>
  );
}
