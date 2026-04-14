import { Recipe } from "@/lib/types";
import Image from "next/image";

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails?: (recipe: Recipe) => void;
  onAssignToDay?: (recipe: Recipe) => void;
  assignedDay?: string;
  isAssigningToDay?: boolean;
}

export default function RecipeCard({ recipe, onViewDetails, onAssignToDay, assignedDay, isAssigningToDay = false }: RecipeCardProps) {
  const ingredientCount = recipe.extendedIngredients?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {recipe.image ? (
          <Image src={recipe.image} alt={recipe.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{recipe.title}</h3>

        {/* Meta info */}
        <div className="flex gap-4 text-sm text-gray-600 mb-3">
          {recipe.readyInMinutes && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              {recipe.readyInMinutes} min
            </span>
          )}
          {recipe.servings && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 0a9 9 0 018.093 12H17a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4.093A9 9 0 109 0z" />
              </svg>
              {recipe.servings} servings
            </span>
          )}
        </div>

        {/* Ingredients count */}
        {ingredientCount > 0 && (
          <p className="text-sm text-gray-500 mb-3">
            {ingredientCount} ingredient{ingredientCount !== 1 ? "s" : ""}
          </p>
        )}

        {/* Assigned day badge */}
        {assignedDay && <div className="mb-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded inline-block w-fit">Assigned: {assignedDay}</div>}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          {onViewDetails && (
            <button onClick={() => onViewDetails(recipe)} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors">
              View Details
            </button>
          )}
          {onAssignToDay && (
            <button
              onClick={() => onAssignToDay(recipe)}
              disabled={isAssigningToDay}
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAssigningToDay ? "Assigning..." : "Assign"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
