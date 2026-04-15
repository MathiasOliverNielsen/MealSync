"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SearchInput } from "@/components/SearchInput";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strMealThumb?: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [noResults, setNoResults] = useState(false);

  // Fetch categories and areas on load
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [catRes, areaRes] = await Promise.all([fetch("/api/recipes?type=categories"), fetch("/api/recipes?type=areas")]);
        const catData = await catRes.json();
        const areaData = await areaRes.json();
        if (catData.categories) setCategories(catData.categories.map((c: any) => c.strCategory));
        if (areaData.areas) setAreas(areaData.areas.map((a: any) => a.strArea));
      } catch (error) {
        console.error("Error loading filters:", error);
      }
    };
    loadFilters();
  }, []);

  // Load 12 random recipes on mount
  useEffect(() => {
    const loadRandomRecipes = async () => {
      setLoading(true);
      try {
        const randomMeals: Recipe[] = [];
        const seenIds = new Set<string>();

        // Fetch random meals, avoiding duplicates
        for (let i = 0; i < 12; i++) {
          try {
            const res = await fetch("/api/recipes?type=random");
            const data = await res.json();
            if (data.meals && data.meals[0]) {
              const meal = data.meals[0];
              if (!seenIds.has(meal.idMeal)) {
                randomMeals.push(meal);
                seenIds.add(meal.idMeal);
              } else {
                // If duplicate, try again
                i--;
              }
            }
          } catch (error) {
            console.error("Error fetching random meal:", error);
          }
        }

        setRecipes(randomMeals);
      } catch (error) {
        console.error("Error loading random recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRandomRecipes();
  }, []);

  // Search recipes
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setNoResults(false);
    try {
      const res = await fetch(`/api/recipes?type=search&s=${searchQuery}`);
      const data = await res.json();
      setRecipes(data.meals || []);
      if (!data.meals || data.meals.length === 0) setNoResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  // Filter by category
  const handleCategoryFilter = async (selectedCategory: string) => {
    setCategory(selectedCategory);
    setLoading(true);
    setNoResults(false);
    try {
      const res = await fetch(`/api/recipes?type=filter&c=${selectedCategory}`);
      const data = await res.json();
      setRecipes(data.meals || []);
      if (!data.meals || data.meals.length === 0) setNoResults(true);
    } catch (error) {
      console.error("Filter error:", error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  // Filter by area
  const handleAreaFilter = async (selectedArea: string) => {
    setArea(selectedArea);
    setLoading(true);
    setNoResults(false);
    try {
      const res = await fetch(`/api/recipes?type=filter&a=${selectedArea}`);
      const data = await res.json();
      setRecipes(data.meals || []);
      if (!data.meals || data.meals.length === 0) setNoResults(true);
    } catch (error) {
      console.error("Filter error:", error);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  // Get random recipe
  const handleRandomRecipe = async () => {
    setLoading(true);
    setNoResults(false);
    try {
      const res = await fetch("/api/recipes?type=random");
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Random recipe error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white w-full">
      <section className="py-10 md:py-14 lg:py-16 border-b border-gray-100 w-full">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Recipes</h1>
              <p className="text-lg text-gray-600">Browse thousands of recipes, filter by cuisine, and build your meal plan.</p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search Input */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <SearchInput placeholder="Search recipes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
                </div>
                <Button onClick={handleRandomRecipe} variant="secondary" className="sm:w-32">
                  Random
                </Button>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleCategoryFilter(e.target.value);
                    }
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 transition-colors"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  value={area}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAreaFilter(e.target.value);
                    }
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 transition-colors"
                >
                  <option value="">All Cuisines</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Recipes Grid */}
      <section className="py-10 md:py-14 w-full">
        <Container>
          {loading && (
            <div className="text-center py-10 md:py-16">
              <p className="text-gray-600 text-lg">Loading recipes...</p>
            </div>
          )}

          {noResults && !loading && (
            <div className="text-center py-10 md:py-16">
              <p className="text-gray-600 mb-4 text-lg">No recipes matched your search.</p>
              <p className="text-base text-gray-500">Try changing your filters or search term.</p>
            </div>
          )}

          {recipes.length > 0 && !loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <Link key={recipe.idMeal} href={`/recipes/${recipe.idMeal}`}>
                  <div className="group cursor-pointer">
                    <div className="relative h-64 bg-gray-100 rounded-xl overflow-hidden mb-3">
                      {recipe.strMealThumb ? (
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{recipe.strMeal}</h3>
                      <div className="flex flex-wrap gap-2">
                        {recipe.strCategory && <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{recipe.strCategory}</span>}
                        {recipe.strArea && <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{recipe.strArea}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && recipes.length === 0 && !noResults && (
            <div className="text-center py-16 md:py-20">
              <p className="text-gray-600 mb-6 text-lg">Start by searching for a recipe or selecting a filter.</p>
              <Button onClick={handleRandomRecipe}>Get Random Recipe</Button>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
