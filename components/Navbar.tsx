"use client";

import { useState } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import AuthSection from "./AuthSection";
import MobileMenuToggle from "./MobileMenuToggle";
import MobileMenu from "./MobileMenu";

type NavbarProps = {
  isLoggedIn?: boolean;
};

const Navbar = ({ isLoggedIn = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / App Name */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            Meal Sync
          </Link>

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Desktop Auth Section */}
          <AuthSection isLoggedIn={isLoggedIn} />

          {/* Mobile Menu Toggle */}
          <MobileMenuToggle isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMenuOpen} isLoggedIn={isLoggedIn} onClose={closeMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
