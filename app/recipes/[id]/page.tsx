"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strMealThumb?: string;
  strInstructions?: string;
  [key: string]: any;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [meal, setMeal] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [assignMode, setAssignMode] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(`/api/recipes?type=meal&i=${resolvedParams.id}`);
        const data = await res.json();
        if (data.meals && data.meals[0]) {
          setMeal(data.meals[0]);
        }
      } catch (error) {
        console.error("Failed to load meal:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [resolvedParams.id]);

  const handleAssignToDay = (day: string) => {
    if (!meal || !meal.strMeal || !meal.idMeal) {
      alert("Failed to load recipe. Please refresh and try again.");
      return;
    }
    const mealPlan = JSON.parse(localStorage.getItem("mealPlan") || "{}");
    mealPlan[day] = {
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      instructions: meal.strInstructions,
      category: meal.strCategory,
      area: meal.strArea,
    };
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    setAssignMode(false);
    // Redirect to meal plan with success message
    alert(`${meal.strMeal} assigned to ${day}! Redirecting to meal plan...`);
    router.push("/meal-plan");
  };

  // Extract ingredients
  const ingredients: Array<{ ingredient: string; measure: string }> = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ ingredient, measure: measure || "" });
      }
    }
  }

  if (loading) {
    return (
      <main className="bg-white">
        <Container className="py-10 md:py-14">
          <p className="text-gray-600 text-lg">Loading recipe...</p>
        </Container>
      </main>
    );
  }

  if (!meal) {
    return (
      <main className="bg-white">
        <Container className="py-10 md:py-14">
          <p className="text-gray-600 mb-8 text-lg">Recipe not found.</p>
          <Link href="/recipes">
            <Button>Back to Recipes</Button>
          </Link>
        </Container>
      </main>
    );
  }

  return (
    <main className="bg-white w-full">
      <section className="py-10 md:py-14 w-full">
        <Container>
          <Link href="/recipes" className="inline-block mb-8">
            <Button variant="secondary">Back to Recipes</Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Sidebar */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              {meal.strMealThumb && <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-xl mb-6 aspect-square object-cover" />}

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{meal.strMeal}</h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {meal.strCategory && <span className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold\">{meal.strCategory}</span>}
                {meal.strArea && <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold\">{meal.strArea}</span>}
              </div>

              {/* Assign Section */}
              <div className="space-y-4">
                {!assignMode ? (
                  <Button className="w-full py-4 text-lg" onClick={() => setAssignMode(true)} disabled={loading}>
                    Add to Meal Plan
                  </Button>
                ) : (
                  <div className="space-y-3 border-t-2 border-gray-100 pt-8">
                    <p className="text-base font-semibold text-gray-900 mb-6">Assign to day:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {DAYS.map((day) => (
                        <button
                          key={day}
                          onClick={() => handleAssignToDay(day)}
                          className="px-4 py-3 text-sm font-medium border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-gray-900"
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setAssignMode(false)}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mt-4 text-gray-700 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Instructions */}
              {meal.strInstructions && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Instructions</h2>
                  <p className="text-gray-700 leading-8 text-lg whitespace-pre-wrap">{meal.strInstructions}</p>
                </div>
              )}

              {/* Ingredients */}
              {ingredients.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Ingredients ({ingredients.length})</h2>
                  <div className="space-y-4">
                    {ingredients.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg">{item.ingredient}</p>
                          {item.measure && <p className="text-gray-600 text-base mt-1">{item.measure}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
