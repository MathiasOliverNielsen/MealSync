# MealSync - Meal Planning & Shopping List App

A modern, mobile-friendly meal planning and shopping list application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Powered by the **Spoonacular API**, MealSync helps you plan your weekly meals and generate consolidated shopping lists automatically.

## Features

- 🔍 **Recipe Discovery**: Search thousands of recipes by name, ingredients, or cuisine type
- 📅 **Weekly Meal Planning**: Assign recipes to specific days (Monday-Sunday) with no duplicates
- 🎲 **Random Week Generator**: Automatically generate a random meal plan ensuring no repeated dishes
- 🛒 **Smart Shopping Lists**: Consolidate ingredients from all planned meals with automatic quantity summing
- 📱 **Mobile-First**: Fully responsive design optimized for all screen sizes
- 💾 **Local Persistence**: Meal plans and shopping lists are stored in browser local storage
- 🎨 **Clean UI**: Modern, polished interface with great UX

## Project Structure

```
app/
├── page.tsx                 # Home page (hero, features, CTA)
├── recipes/
│   └── page.tsx            # Recipe discovery & meal planning
├── meal-plan/
│   └── page.tsx            # Weekly meal plan view & management
├── shopping-list/
│   └── page.tsx            # Consolidated shopping list
├── layout.tsx              # Root layout with PWA manifest
└── globals.css             # Global styles

components/
├── Navbar.tsx              # Navigation bar
├── NavLinks.tsx            # Navigation menu
├── NavLink.tsx             # Individual nav link
├── MobileMenu.tsx          # Mobile navigation menu
├── MobileMenuToggle.tsx    # Mobile menu toggle button
├── Button.tsx              # Reusable button component
├── RecipeCard.tsx          # Recipe card component
├── RecipeCardSkeleton.tsx  # Loading skeleton
├── Footer.tsx              # Footer
├── HeroSection.tsx         # Hero section
├── InfoCards.tsx           # Info card components
└── ...other components

lib/
├── types.ts                # TypeScript types for recipes, meals, shopping lists
├── spoonacular.ts          # Spoonacular API wrapper functions
├── mealPlanUtils.ts        # Meal planning & shopping list logic
└── api-response.ts         # API response helpers

public/
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (optional)
└── icons/
    ├── MealSync192x192.png # App icon (192x192)
    └── MealSync512x512.png # App icon (512x512)
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- A Spoonacular API key (get one for free at https://spoonacular.com/food-api)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd MealSync
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your Spoonacular API key:

   ```env
   NEXT_PUBLIC_SPOONACULAR_API_KEY=your_api_key_here
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## How It Works

### 1. Recipe Discovery (Recipes Page)

- **Search**: Search recipes by name (e.g., "pasta", "chicken")
- **Random**: Load random recipes to explore new ideas
- **Generate Random Week**: Automatically creates a 7-day meal plan with **no duplicate recipes**
- **Day Selection**: Pick a weekday and click "Assign" on any recipe to add it to your meal plan

### 2. Weekly Meal Planning (Meal Plan Page)

- View all 7 days of your meal plan
- See recipe details including cooking time, servings, and ingredients
- Remove recipes to reassign them to other days
- Track how many days are planned

### 3. Shopping List Generation (Shopping List Page)

- Automatically consolidates all ingredients from your meal plan
- **Smart Consolidation**: Merges duplicate ingredients and sums quantities

#### Ingredient Consolidation Logic

The consolidation works through these steps:

1. **Extract All Ingredients**: Gathers ingredients from every recipe assigned to each weekday
2. **Normalize Names**: Converts ingredient names to lowercase and trims whitespace for consistency
3. **Group by Name & Unit**: Creates a map using `{ingredient_name|unit}` as the key
4. **Sum Quantities**: For each unique ingredient, adds up the amounts:
   - Example: If "onion" appears in Monday's (1 onion) and Tuesday's (1 onion) recipes → Result: 2 onions
5. **Round Amounts**: Quantities are rounded to 2 decimal places for readability
6. **Sort Alphabetically**: Final list is sorted by ingredient name for easy shopping
7. **Track Frequency**: Each item shows how many meals use it

#### Example

| Day       | Recipe          | Ingredients                 |
| --------- | --------------- | --------------------------- |
| Monday    | Pasta Carbonara | 1 onion, 2 eggs, 200g pasta |
| Tuesday   | Omelet          | 1 onion, 3 eggs             |
| Wednesday | Spaghetti       | 200g pasta                  |

**Shopping List Result**:

- Eggs: 5 units (2 meals)
- Onion: 2 units (2 meals)
- Pasta: 400g (2 meals)

### 4. Random Week Generator (Duplicate Prevention)

When you click "Generate Random Week", the app:

1. **Fetches 20 random recipes** from Spoonacular API
2. **Filters by Recipe ID**: Removes any duplicates from the fetched results
3. **Assigns to Days**: Places unique recipes into Monday-Sunday slots
4. **If Insufficient**: Fetches 10 more recipes and repeats filtering if needed
5. **Result**: A guaranteed 7-day plan with **zero recipe repetitions**

This approach ensures variety and prevents the same meal from appearing twice in a generated week.

## API Integration

MealSync uses the **Spoonacular API** for recipe data. Key endpoints used:

- `complexSearch` - Search recipes by name/query
- `random` - Get random recipes
- `{id}/information` - Get detailed recipe info
- `{id}/similar` - Find similar recipes
- `findByIngredients` - Search recipes by ingredients

All API calls include automatic error handling and graceful fallbacks.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Spoonacular REST API
- **Storage**: Browser Local Storage
- **State Management**: React Hooks (useState, useEffect)
- **PWA**: Service Worker + Web Manifest

## Data Persistence

- **Meal Plans**: Stored in `localStorage` under key `mealSync_mealPlan`
- **Shopping Lists**: Stored in `localStorage` under key `mealSync_shoppingList`
- **Persistence Scope**: Data survives page refresh and browser restart
- **Clearing Data**: Use "Clear All" buttons to reset data

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 12+)
- Mobile Browsers: Full support with responsive UI

## Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading of recipe cards
- ✅ Skeleton loading states
- ✅ Efficient local storage queries
- ✅ Minimal API calls with smart caching

## Future Enhancements

- [ ] Ingredient substitutions & alternatives
- [ ] Dietary preferences & allergies filtering
- [ ] Recipe ratings & user reviews
- [ ] Share meal plans with others
- [ ] Nutrition information display
- [ ] Print shopping list
- [ ] Backend database for multi-device sync

## License

MIT

## Credits

- Recipe data powered by [Spoonacular API](https://spoonacular.com/food-api)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for meal planning enthusiasts**
