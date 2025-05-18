import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explorer", path: "/explorer" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-800"
    >
      <Link
        to="/"
        className="text-primary text-2xl font-extrabold tracking-wide hover:text-secondary transition-colors duration-300"
      >
        VisualOverlap
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`relative text-lg font-medium transition-all duration-300 ${
              location.pathname === link.path
                ? "text-secondary"
                : "text-gray-300 hover:text-primary"
            }`}
          >
            {link.name}
            {location.pathname === link.path && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-300 hover:text-primary transition-colors duration-300"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
