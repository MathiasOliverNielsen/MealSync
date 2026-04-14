"use client";

import { useState, useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";
import Button from "@/components/Button";
import { searchRecipes, getRandomRecipes } from "@/lib/spoonacular";
import { Recipe, Weekday, WEEKDAYS } from "@/lib/types";
import { loadMealPlanFromStorage, assignRecipeToDay, saveMealPlanToStorage, generateRandomWeeklyPlan } from "@/lib/mealPlanUtils";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mealPlan, setMealPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState<Weekday | null>(null);
  const [assigningRecipe, setAssigningRecipe] = useState<number | null>(null);

  // Load meal plan on mount
  useEffect(() => {
    setMealPlan(loadMealPlanFromStorage());
    loadInitialRecipes();
  }, []);

  const loadInitialRecipes = async () => {
    setLoading(true);
    setError("");
    const data = await getRandomRecipes(12);
    if (data.length === 0) {
      setError("Failed to load recipes. Please check your API key.");
    }
    setRecipes(data);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadInitialRecipes();
      return;
    }

    setLoading(true);
    setError("");
    const data = await searchRecipes(searchQuery, 12);
    if (data.length === 0) {
      setError(`No recipes found for "${searchQuery}". Try different keywords.`);
    }
    setRecipes(data);
    setLoading(false);
  };

  const handleGenerateRandomWeek = async () => {
    setLoading(true);
    setError("");
    try {
      const newPlan = await generateRandomWeeklyPlan(getRandomRecipes);
      setMealPlan(newPlan);
    } catch (err) {
      setError("Failed to generate random meal plan. Please try again.");
    }
    setLoading(false);
  };

  const handleAssignRecipe = async (recipe: Recipe, day?: Weekday) => {
    const targetDay = day || selectedDay;
    if (!targetDay) {
      alert("Please select a day first");
      return;
    }

    setAssigningRecipe(recipe.id);
    const updated = assignRecipeToDay(mealPlan, targetDay, recipe);
    setMealPlan(updated);
    saveMealPlanToStorage(updated);
    setAssigningRecipe(null);
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 md:sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Recipes</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search recipes by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" size="md">
                Search
              </Button>
              <Button type="button" variant="secondary" size="md" onClick={loadInitialRecipes}>
                Random
              </Button>
            </div>
          </form>

          {/* Day Selector for Meal Planning */}
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select day to assign recipes:</label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {WEEKDAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                  className={`px-2 py-2 rounded text-sm font-medium transition-colors ${selectedDay === day ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" onClick={handleGenerateRandomWeek} disabled={loading}>
              Generate Random Week
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No recipes found</p>
            <Button onClick={loadInitialRecipes}>Load Random Recipes</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => {
              const assignedDay = Object.entries(mealPlan).find(([_, r]) => r && r.id === recipe.id)?.[0];

              return <RecipeCard key={recipe.id} recipe={recipe} onAssignToDay={() => handleAssignRecipe(recipe)} assignedDay={assignedDay} isAssigningToDay={assigningRecipe === recipe.id} />;
            })}
          </div>
        )}
      </main>
    </div>
  );
}
