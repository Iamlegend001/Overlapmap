import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import SidebarControls from "../components/SidebarControls";
import SavedDock from "../components/SavedDock";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Navbar */}
      <Navbar
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || isMobileMenuOpen) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className={`
                fixed md:relative
                top-16 md:top-0
                left-0
                h-[calc(100vh-64px)] md:h-full
                z-20
                ${isMobileMenuOpen ? "block" : "hidden md:block"}
              `}
            >
              <div className="h-full p-4">
                <SidebarControls
                  onFilterChange={(filter) => console.log("Filter:", filter)}
                  onSortChange={(sort) => console.log("Sort:", sort)}
                />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main
          className={`
            flex-1
            p-4 md:p-6
            overflow-y-auto
            transition-all duration-300
            ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}
          `}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Saved Items Dock */}
      <SavedDock
        items={[
          {
            id: 1,
            title: "The Matrix",
            subtitle: "Movie",
            icon: "🎬",
          },
          {
            id: 2,
            title: "Dune",
            subtitle: "Book",
            icon: "📚",
          },
          // Add more items as needed
        ]}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
