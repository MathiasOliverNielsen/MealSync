"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { ShoppingListItem, WeeklyMealPlan } from "@/lib/types";
import { loadMealPlanFromStorage, consolidateShoppingList, saveShoppingListToStorage, clearAllStoredData } from "@/lib/mealPlanUtils";

export default function ShoppingListPage() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loaded = loadMealPlanFromStorage();
    setMealPlan(loaded);
    const consolidated = consolidateShoppingList(loaded);
    setShoppingList(consolidated);
    saveShoppingListToStorage(consolidated);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const toggleCheckItem = (itemName: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemName)) {
      newChecked.delete(itemName);
    } else {
      newChecked.add(itemName);
    }
    setCheckedItems(newChecked);
  };

  const handleClearList = () => {
    if (confirm("Clear the entire shopping list?")) {
      clearAllStoredData();
      window.location.reload();
    }
  };

  const handleRefreshList = () => {
    const loaded = loadMealPlanFromStorage();
    const consolidated = consolidateShoppingList(loaded);
    setShoppingList(consolidated);
    saveShoppingListToStorage(consolidated);
  };

  const checkedCount = checkedItems.size;
  const totalItems = shoppingList.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 md:sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping List</h1>
          <p className="text-gray-600">
            {checkedCount} of {totalItems} items marked
          </p>

          {/* Actions */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link href="/meal-plan">
              <Button size="md" variant="secondary">
                View Meal Plan
              </Button>
            </Link>
            {totalItems > 0 && (
              <>
                <Button size="md" onClick={handleRefreshList}>
                  Refresh List
                </Button>
                <Button size="md" variant="danger" onClick={handleClearList}>
                  Clear All
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {totalItems === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg mb-4">Your shopping list is empty</p>
            <p className="text-gray-400 mb-6">Plan your meals first to generate a shopping list</p>
            <Link href="/meal-plan">
              <Button size="lg">View Meal Plan</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-gray-200">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{
                  width: totalItems > 0 ? `${(checkedCount / totalItems) * 100}%` : "0%",
                }}
              />
            </div>

            {/* Items list */}
            <div className="divide-y divide-gray-200">
              {shoppingList.map((item) => {
                const itemKey = `${item.name}-${item.unit}`;
                const isChecked = checkedItems.has(itemKey);

                return (
                  <div key={itemKey} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                    <input type="checkbox" checked={isChecked} onChange={() => toggleCheckItem(itemKey)} className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500" />

                    <div className="flex-1 min-w-0">
                      <p className={`font-medium transition-all ${isChecked ? "text-gray-400 line-through" : "text-gray-900"}`}>{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Appears in {item.count} meal{item.count !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className={`text-right shrink-0 ${isChecked ? "text-gray-400" : "text-gray-900"}`}>
                      <p className="font-semibold">
                        {item.amount} {item.unit}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                {checkedCount > 0 && (
                  <>
                    Great! You've checked {checkedCount} item{checkedCount !== 1 ? "s" : ""} off your list.
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Info Section */}
        {/* {totalItems > 0 && (
          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">How consolidation works:</h2>
            <ul className="text-sm text-blue-800 space-y-2 list-inside">
              <li>✓ Ingredients are merged by name and unit</li>
              <li>✓ Quantities are summed (e.g., 1 onion + 1 onion = 2 onions)</li>
              <li>✓ Quantities are rounded to 2 decimal places for clarity</li>
              <li>✓ Items are sorted alphabetically for easy shopping</li>
              <li>✓ The count shows how many meals use each ingredient</li>
            </ul>
          </div>
        )} */}
      </main>
    </div>
  );
}
