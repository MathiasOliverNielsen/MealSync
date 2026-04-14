export default function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-300" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-10 bg-gray-300 rounded" />
          <div className="flex-1 h-10 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
