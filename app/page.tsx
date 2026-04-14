import Link from "next/link";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16 px-4 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">MealSync</h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">Plan your meals for the week and automatically generate shopping lists</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recipes">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Recipes
              </Button>
            </Link>
            <Link href="/meal-plan">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Meal Plan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About MealSync</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Recipes</h3>
              <p className="text-gray-600">Explore thousands of recipes powered by the Spoonacular API. Search by name, filter by ingredients, or discover random meals.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan Your Week</h3>
              <p className="text-gray-600">Assign recipes to each day of the week. Generate a random meal plan with no repeating dishes, or plan manually.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Shopping</h3>
              <p className="text-gray-600">Automatically consolidate ingredients from your meal plan into a comprehensive shopping list with quantities.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-900">Search for recipes</h3>
                <p className="text-gray-600">Use the recipes page to search by name, ingredients, or cuisine type.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-900">Assign recipes to days</h3>
                <p className="text-gray-600">Click "Assign" on any recipe to add it to a specific day in your weekly meal plan.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-900">View shopping list</h3>
                <p className="text-gray-600">Go to the shopping list page to see all consolidated ingredients needed for your meals.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold text-gray-900">Shop & cook</h3>
                <p className="text-gray-600">Use your personalized shopping list to buy ingredients and follow your meal plan throughout the week.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to plan your meals?</h2>
          <p className="text-gray-600 mb-6">Start by exploring our recipe collection or generate a random week plan.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recipes">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/shopping-list">
              <Button size="lg" variant="outline">
                View Shopping List
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2026 MealSync. Powered by Spoonacular API.</p>
        </div>
      </footer>
    </div>
  );
}
