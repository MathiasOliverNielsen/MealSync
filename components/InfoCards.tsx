const cards = [
  {
    title: "About Us",
    description: "We help you plan meals and generate shopping lists based on your chosen recipes. Our goal is to make meal planning simple and stress-free.",
  },
  {
    title: "How It Works",
    description: "Select a meal or dish, and the app automatically creates a shopping list with all the ingredients you need.",
  },
  {
    title: "Example Use Case",
    description: "You want to make lasagna this week. Pick it in the app, and instantly get a shopping list for all required ingredients.",
  },
];

const InfoCards = () => (
  <section className="py-12 px-4 bg-white">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {cards.map((card) => (
        <div key={card.title} className="border rounded-lg p-6 flex flex-col items-center bg-gray-50 shadow-sm">
          <div className="mb-4 w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full">
            {/* Card icon placeholder */}
            <span className="text-gray-400 text-sm">[Icon]</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
          <p className="text-gray-600 text-center">{card.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default InfoCards;
