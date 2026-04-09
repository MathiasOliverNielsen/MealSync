const HeroSection = () => (
  <section className="bg-gray-50 py-12 px-4 flex flex-col items-center">
    <div className="max-w-2xl text-center">
      <h1 className="text-4xl font-bold mb-4">Plan Your Meals, Simplified</h1>
      <p className="text-gray-600 mb-6">Pick a recipe, get a shopping list. That's it.</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">Get Started</button>
    </div>
    <div className="mt-10 w-full flex justify-center">
      <div className="bg-gray-200 w-300 h-100 flex items-center justify-center rounded shadow-inner">
        {/* Hero image placeholder */}
        <span className="text-gray-400">[Hero Image Placeholder]</span>
      </div>
    </div>
  </section>
);

export default HeroSection;
