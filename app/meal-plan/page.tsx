"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { Weekday, WEEKDAYS, WeeklyMealPlan } from "@/lib/types";
import { loadMealPlanFromStorage, saveMealPlanToStorage, removeRecipeFromDay, initializeMealPlan, clearAllStoredData } from "@/lib/mealPlanUtils";

export default function MealPlanPage() {
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan>(initializeMealPlan());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadMealPlanFromStorage();
    setMealPlan(loaded);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleRemoveRecipe = (day: Weekday) => {
    const updated = removeRecipeFromDay(mealPlan, day);
    setMealPlan(updated);
    saveMealPlanToStorage(updated);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all meal plans?")) {
      const newPlan = initializeMealPlan();
      setMealPlan(newPlan);
      saveMealPlanToStorage(newPlan);
    }
  };

  const filledDays = Object.values(mealPlan).filter((r) => r !== null).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 md:sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Meal Plan</h1>
          <p className="text-gray-600">
            {filledDays} out of {WEEKDAYS.length} days planned
          </p>

          {/* Actions */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link href="/recipes">
              <Button size="md">Add Recipes</Button>
            </Link>
            <Link href="/shopping-list">
              <Button size="md" variant="secondary">
                View Shopping List
              </Button>
            </Link>
            {filledDays > 0 && (
              <Button size="md" variant="danger" onClick={handleClearAll}>
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filledDays === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg mb-4">No meals planned yet</p>
            <p className="text-gray-400 mb-6">Go to the recipes page and assign meals to your week</p>
            <Link href="/recipes">
              <Button size="lg">Browse Recipes</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {WEEKDAYS.map((day) => {
              const recipe = mealPlan[day];

              return (
                <div key={day} className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Day header */}
                    <div className="shrink-0 w-full md:w-32">
                      <h2 className="text-2xl font-bold text-blue-600">{day}</h2>
                    </div>

                    {/* Recipe content */}
                    <div className="flex-1">
                      {recipe ? (
                        <div className="flex flex-col sm:flex-row gap-6">
                          {/* Recipe image */}
                          {recipe.image && (
                            <div className="shrink-0 w-full sm:w-40 h-40 rounded-lg overflow-hidden bg-gray-200">
                              <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                            </div>
                          )}

                          {/* Recipe details */}
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h3>

                            <div className="flex gap-4 text-sm text-gray-600 mb-4">
                              {recipe.readyInMinutes && <span>⏱️ {recipe.readyInMinutes} min</span>}
                              {recipe.servings && <span>👥 {recipe.servings} servings</span>}
                            </div>

                            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">Ingredients ({recipe.extendedIngredients.length}):</h4>
                                <ul className="text-sm text-gray-600 space-y-1 list-inside">
                                  {recipe.extendedIngredients.slice(0, 5).map((ing, idx) => (
                                    <li key={idx}>
                                      {ing.amount} {ing.unit} {ing.name}
                                    </li>
                                  ))}
                                  {recipe.extendedIngredients.length > 5 && <li>... and {recipe.extendedIngredients.length - 5} more</li>}
                                </ul>
                              </div>
                            )}

                            <Button variant="danger" size="sm" onClick={() => handleRemoveRecipe(day)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">No meal assigned</p>
                          <Link href="/recipes">
                            <Button size="sm">Assign a Recipe</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
