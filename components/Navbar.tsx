"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "./Container";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/meal-plan", label: "Week Plan" },
    { href: "/shopping-list", label: "Shopping List" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 w-full">
      <Container className="py-4 sm:py-5 md:py-6 flex justify-between items-center px-4 sm:px-0">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors flex-shrink-0">
          MealSync
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-700 hover:text-blue-600 font-medium text-sm lg:text-base transition-colors relative group">
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <div className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
          <div className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></div>
          <div className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
        </button>
      </Container>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-100">
          <Container className="py-4 sm:py-6 flex flex-col gap-3 sm:gap-4 px-4 sm:px-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors block py-3 sm:py-4 px-0 sm:px-2 min-h-11 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </nav>
  );
}
