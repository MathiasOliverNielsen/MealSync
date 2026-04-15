import { Meal } from "@/lib/types";
import { Card } from "./Card";

interface InstructionsSectionProps {
  meal: Meal;
}

export function InstructionsSection({ meal }: InstructionsSectionProps) {
  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Instructions</h3>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{meal.strInstructions}</p>
    </Card>
  );
}
