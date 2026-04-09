"use client";

import { useEffect, useState } from "react";

type Recipe = {
  id: number;
  title: string;
  image: string;
};
type RecipesResponse = {
  recipes: Recipe[];
};

export default function FetchRecipes() {
  const [recipes, setRecipes] = useState<RecipesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!recipes) return <div>No recipes found.</div>;

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.recipes?.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            {recipe.image && <img src={recipe.image} alt={recipe.title} width={200} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
