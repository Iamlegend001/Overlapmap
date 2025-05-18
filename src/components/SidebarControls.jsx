import React from "react";
import { motion } from "framer-motion";

export default function SidebarControls({ onFilterChange, onSortChange }) {
  const filters = [
    { id: "all", label: "All", icon: "🌐" },
    { id: "movies", label: "Movies", icon: "🎬" },
    { id: "books", label: "Books", icon: "📚" },
    { id: "music", label: "Music", icon: "🎵" },
  ];

  const sortOptions = [
    { id: "recent", label: "Most Recent", icon: "🕒" },
    { id: "popular", label: "Most Popular", icon: "🔥" },
    { id: "match", label: "Best Match", icon: "⭐" },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-black/40 backdrop-blur-lg rounded-2xl border border-gray-800 p-4 space-y-6"
    >
      {/* Filter Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-3">FILTERS</h3>
        <div className="space-y-2">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFilterChange?.(filter.id)}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              <span className="text-lg">{filter.icon}</span>
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sort Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-3">SORT BY</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSortChange?.(option.id)}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              <span className="text-lg">{option.icon}</span>
              <span>{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="pt-4 border-t border-gray-800">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">STATS</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Items</span>
            <span className="text-primary font-semibold">156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Shared</span>
            <span className="text-secondary font-semibold">42</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Matches</span>
            <span className="text-green-500 font-semibold">89%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

