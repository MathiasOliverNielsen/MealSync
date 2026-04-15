"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface MealData {
  id: string;
  name: string;
  image?: string;
  instructions?: string;
  category?: string;
  area?: string;
  cookingTime?: number;
}

interface MealPlan {
  [key: string]: MealData | null;
}

export default function MealPlanPage() {
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealData | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [editingCookTime, setEditingCookTime] = useState<{ day: string; value: string } | null>(null);

  const emptyPlan: MealPlan = {
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
    Sunday: null,
  };

  // Load meal plan from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mealPlan");
    if (saved) {
      try {
        setPlan(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load meal plan:", error);
        setPlan(emptyPlan);
      }
    } else {
      setPlan(emptyPlan);
    }
    setIsLoaded(true);
  }, []);

  // Save meal plan to localStorage whenever it changes (but only after loading)
  useEffect(() => {
    if (isLoaded && plan) {
      localStorage.setItem("mealPlan", JSON.stringify(plan));
    }
  }, [plan, isLoaded]);

  const handleRemoveMeal = (day: string) => {
    setPlan((prev) => ({ ...prev, [day]: null }));
  };

  const handleUpdateCookingTime = (day: string, cookingTime: number) => {
    setPlan((prev) => ({
      ...prev,
      [day]: prev?.[day] ? { ...prev[day]!, cookingTime } : null,
    }));
    setEditingCookTime(null);
  };

  const handleClearWeek = () => {
    setPlan({
      Monday: null,
      Tuesday: null,
      Wednesday: null,
      Thursday: null,
      Friday: null,
      Saturday: null,
      Sunday: null,
    });
  };

  const handleGenerateWeek = async () => {
    // Load random meals for each day
    const newPlan = { ...plan };
    for (const day of DAYS) {
      try {
        const res = await fetch("/api/recipes?type=random");
        const data = await res.json();
        if (data.meals && data.meals[0]) {
          const meal = data.meals[0];
          newPlan[day] = {
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            instructions: meal.strInstructions,
            category: meal.strCategory,
            area: meal.strArea,
          };
        }
      } catch (error) {
        console.error(`Failed to generate meal for ${day}:`, error);
      }
    }
    setPlan(newPlan);
  };

  return (
    <main className="bg-white w-full">
      <section className="py-10 md:py-14 border-b border-gray-100 w-full">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Week Plan</h1>
              <p className="text-lg text-gray-600">Organize your meals for each day of the week. Generate random meals or customize your plan.</p>
            </div>

            {/* Week Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleGenerateWeek} size="lg" disabled={!isLoaded}>
                Generate Random Week
              </Button>
              <Button onClick={handleClearWeek} variant="secondary" size="lg" disabled={!isLoaded}>
                Clear Week
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Weekly Planner */}
      <section className="py-10 md:py-14 w-full">
        <Container>
          {!isLoaded ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Loading meal plan...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {DAYS.map((day) => (
                <div key={day} className="bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors overflow-hidden">
                  {plan && plan[day] ? (
                    <div className="flex flex-col h-full">
                      {/* Image */}
                      {plan[day]?.image && (
                        <div className="relative h-40 w-full bg-gray-200">
                          <Image src={plan[day].image} alt={plan[day].name} fill className="object-cover" />
                        </div>
                      )}

                      {/* Day Header */}
                      <div className="px-6 pt-5 pb-2">
                        <h3 className="font-bold text-lg text-gray-900">{day}</h3>
                      </div>

                      {/* Meal Content */}
                      <div className="px-6 flex-1 flex flex-col">
                        <p className="font-medium text-gray-900 line-clamp-2 text-sm mb-3">{plan[day]?.name}</p>

                        {/* Category and Area */}
                        {(plan[day]?.category || plan[day]?.area) && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {plan[day]?.category && <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{plan[day].category}</span>}
                            {plan[day]?.area && <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">{plan[day].area}</span>}
                          </div>
                        )}

                        {/* Cooking Time */}
                        <div className="mb-4">
                          {editingCookTime?.day === day ? (
                            <div className="flex gap-2">
                              <input
                                type="number"
                                min="1"
                                defaultValue={plan[day]?.cookingTime || 30}
                                className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleUpdateCookingTime(day, parseInt((e.target as HTMLInputElement).value) || 30);
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  const input = document.querySelector(`input[data-day="${day}"]`) as HTMLInputElement;
                                  handleUpdateCookingTime(day, parseInt(input?.value) || 30);
                                }}
                                className="px-2 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setEditingCookTime({ day, value: String(plan[day]?.cookingTime || 30) })} className="text-sm text-gray-600 hover:text-gray-900 py-1">
                              ⏱️ {plan[day]?.cookingTime || "—"} min
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="px-6 pb-6 flex flex-col gap-3">
                        <button
                          onClick={() => {
                            setSelectedMeal(plan[day]!);
                            setShowInstructions(true);
                          }}
                          className="w-full text-sm py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                        >
                          View Recipe
                        </button>
                        <Link href="/recipes" className="w-full">
                          <Button size="sm" variant="secondary" className="w-full">
                            Change
                          </Button>
                        </Link>
                        <Button size="sm" variant="secondary" className="w-full" onClick={() => handleRemoveMeal(day)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center py-12 px-6">
                      <div className="text-center space-y-4">
                        <p className="text-gray-600 font-medium">{day}</p>
                        <p className="text-gray-500 text-sm">No meal assigned</p>
                      </div>
                      <Link href="/recipes" className="w-full mt-6">
                        <Button size="sm" className="w-full">
                          Add Meal
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Instructions Modal */}
      {showInstructions && selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedMeal.name}</h2>
              <button onClick={() => setShowInstructions(false)} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Image and Info */}
              {selectedMeal.image && (
                <div className="relative h-64 w-full bg-gray-200 rounded-xl overflow-hidden">
                  <Image src={selectedMeal.image} alt={selectedMeal.name} fill className="object-cover" />
                </div>
              )}

              {/* Category and Area */}
              {(selectedMeal.category || selectedMeal.area) && (
                <div className="flex gap-2">
                  {selectedMeal.category && <span className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full">{selectedMeal.category}</span>}
                  {selectedMeal.area && <span className="text-sm bg-green-50 text-green-700 px-4 py-2 rounded-full">{selectedMeal.area}</span>}
                </div>
              )}

              {/* Instructions */}
              {selectedMeal.instructions && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Instructions</h3>
                  <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedMeal.instructions}</div>
                </div>
              )}

              {/* Cooking Time */}
              {selectedMeal.cookingTime && (
                <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Estimated cooking time:</span> {selectedMeal.cookingTime} minutes
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
              <Button onClick={() => setShowInstructions(false)} variant="secondary" className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
