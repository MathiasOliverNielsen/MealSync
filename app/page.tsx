"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import RecipeCarousel from "@/components/RecipeCarousel";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb?: string;
}

export default function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const meals: Recipe[] = [];
        const seenIds = new Set<string>();

        for (let i = 0; i < 8; i++) {
          try {
            const res = await fetch("/api/recipes?type=random");
            const data = await res.json();
            if (data.meals?.[0]) {
              const meal = data.meals[0];
              if (!seenIds.has(meal.idMeal)) {
                meals.push(meal);
                seenIds.add(meal.idMeal);
              } else {
                i--;
              }
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
        setFeaturedRecipes(meals);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <main className="bg-white w-full">
      {/* Hero Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-14 border-b border-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Plan meals,
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400">build your list</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
              Find recipes, assign them to your week, and automatically generate a shopping list. All done in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 px-4 sm:px-0">
              <Link href="/recipes" className="w-full sm:w-auto">
                <Button size="md" className="w-full sm:w-auto">
                  Browse Recipes
                </Button>
              </Link>
              <Link href="/meal-plan" className="w-full sm:w-auto">
                <Button size="md" variant="secondary" className="w-full sm:w-auto">
                  View Week Plan
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Recipes Section */}
      {!loading && featuredRecipes.length > 0 && (
        <section className="py-6 sm:py-8 md:py-12 border-b border-gray-100 w-full">
          <Container>
            <div className="space-y-4 px-4 sm:px-0">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2">Featured Recipes</h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">Explore some popular dishes to get started</p>
              </div>
              <RecipeCarousel recipes={featuredRecipes} />
            </div>
          </Container>
        </section>
      )}

      {/* Features Section */}
      <section className="py-6 sm:py-8 md:py-12 border-b border-gray-100 w-full">
        <Container>
          <div className="space-y-6 px-4 sm:px-0">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900">How It Works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Step 1 */}
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 text-blue-600 font-bold text-lg sm:text-xl">1</div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Browse & Search</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Explore thousands of recipes from our extensive database. Filter by cuisine, category, or search for your favorite dishes.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 text-blue-600 font-bold text-lg sm:text-xl">2</div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Plan Your Week</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Assign meals to specific days and build your perfect weekly menu. Generate a random week or customize it yourself.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 text-blue-600 font-bold text-lg sm:text-xl">3</div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Auto-Generate List</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Automatically consolidate all ingredients from your planned meals into a single shopping list with quantities.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 text-blue-600 font-bold text-lg sm:text-xl">4</div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Shop & Cook</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Check off items as you shop and follow your meal plan throughout the week. Everything syncs locally.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-10 md:py-12 border-b border-gray-100 bg-gray-50 w-full">
        <Container>
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Why Choose MealSync</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureBox title="Smart Consolidation" description="Identical ingredients from multiple meals are automatically combined with quantities." />
              <FeatureBox title="Local Storage" description="All your data stays on your device. No accounts needed, no privacy concerns." />
              <FeatureBox title="Fully Responsive" description="Works perfectly on phone, tablet, or desktop. Design that adapts to your screen." />
              <FeatureBox title="Quick & Minimal" description="Clean interface with only the features you need. Fast, lightweight, and distraction-free." />
              <FeatureBox title="Thousands of Recipes" description="Access to a massive database of meals from cuisines around the world." />
              <FeatureBox title="Instant Updates" description="Changes to your plan sync immediately to your shopping list." />
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-12 w-full">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Ready to simplify meal planning?</h2>
            <p className="text-lg md:text-xl text-gray-600">Start planning your meals today. No signup required, no account needed. Everything stays on your device.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/recipes">
                <Button size="lg">Start Browsing</Button>
              </Link>
              <Link href="/meal-plan">
                <Button size="lg" variant="secondary">
                  View Meal Plan
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function FeatureBox({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-4 hover:border-gray-300 hover:shadow-sm transition-all">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
