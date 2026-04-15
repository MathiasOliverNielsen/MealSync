import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16 md:mt-20 w-full">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">MealSync</h3>
            <p className="text-base text-gray-600">Plan meals. Keep shopping simple.</p>
          </div>
          <div className="text-base text-gray-600">
            <p>© 2026 MealSync. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
