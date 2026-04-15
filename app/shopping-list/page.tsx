"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { extractIngredients, mergeIngredients, formatIngredient, type Ingredient } from "@/lib/ingredients";

interface ShoppingItem {
  name: string;
  quantity: string;
  checked: boolean;
}

export default function ShoppingListPage() {
  const [list, setList] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load shopping list from meal plan on mount
  useEffect(() => {
    const loadShoppingList = async () => {
      const mealPlan = localStorage.getItem("mealPlan");
      if (!mealPlan) {
        setLoading(false);
        return;
      }

      try {
        const plan = JSON.parse(mealPlan);
        const allIngredients: Ingredient[] = [];

        // Fetch ingredients for each meal
        for (const day in plan) {
          const meal = plan[day];
          if (meal && meal.id) {
            try {
              const res = await fetch(`/api/recipes?type=meal&i=${meal.id}`);
              const data = await res.json();
              if (data.meals && data.meals[0]) {
                const mealData = data.meals[0];
                // Extract ingredients using utility function
                const ingredients = extractIngredients(mealData);
                allIngredients.push(...ingredients);
              }
            } catch (error) {
              console.error(`Failed to fetch ingredients for meal ${meal.id}:`, error);
            }
          }
        }

        // Merge and format ingredients
        const mergedIngredients = mergeIngredients(allIngredients);
        const shoppingList = mergedIngredients.map((ing) => {
          const formatted = formatIngredient(ing);
          return {
            name: formatted.name,
            quantity: formatted.quantity,
            checked: false,
          };
        });

        setList(shoppingList);
      } catch (error) {
        console.error("Failed to load shopping list:", error);
      } finally {
        setLoading(false);
      }
    };

    loadShoppingList();
  }, []);

  const handleToggleItem = (index: number) => {
    const updated = [...list];
    updated[index].checked = !updated[index].checked;
    setList(updated);
  };

  const handleClearChecked = () => {
    setList(list.filter((item) => !item.checked));
  };

  const handleClearAll = () => {
    setList([]);
    localStorage.removeItem("mealPlan");
  };

  const checkedCount = list.filter((item) => item.checked).length;

  // Empty state
  if (!loading && list.length === 0) {
    return (
      <main className="bg-white">
        <section className="py-16 md:py-20 lg:py-24">
          <Container>
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Shopping List</h1>
                <p className="text-lg text-gray-600">Build your list from your meal plan</p>
              </div>

              <div className="space-y-6">
                <p className="text-gray-600 text-lg">Your shopping list is empty.</p>
                <p className="text-base text-gray-500">Create or update your meal plan to generate a shopping list.</p>
                <Link href="/meal-plan">
                  <Button size="lg">Create Meal Plan</Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white w-full">
      <section className="py-10 md:py-14 border-b border-gray-100 w-full">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Shopping List</h1>
              <p className="text-lg text-gray-600">Consolidated ingredients from your meal plan.</p>
            </div>

            {/* Progress */}
            {list.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-base font-medium text-gray-900">
                    {checkedCount} of {list.length} items checked
                  </p>
                  <p className="text-sm text-gray-500">{Math.round((checkedCount / list.length) * 100)}%</p>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(checkedCount / list.length) * 100}%` }}></div>
                </div>
              </div>
            )}

            {/* List Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button onClick={handleClearChecked} variant="secondary">
                Clear Checked ({list.filter((i) => i.checked).length})
              </Button>
              <Button onClick={handleClearAll} variant="secondary">
                Clear All
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Shopping List */}
      <section className="py-10 md:py-14 w-full">
        <Container>
          {loading ? (
            <div className="text-center py-10 md:py-16">
              <p className="text-gray-600 text-lg">Loading shopping list...</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-3">
              {list.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-white transition-all">
                  <input type="checkbox" checked={item.checked} onChange={() => handleToggleItem(index)} className="shrink-0 w-5 h-5 rounded border-2 border-gray-300 text-blue-600 cursor-pointer" />
                  <div className="flex-1">
                    <span className={`font-medium ${item.checked ? "text-gray-400 line-through" : "text-gray-900"}`}>{item.name}</span>
                  </div>
                  {item.quantity && <span className="shrink-0 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg whitespace-nowrap">{item.quantity}</span>}
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
