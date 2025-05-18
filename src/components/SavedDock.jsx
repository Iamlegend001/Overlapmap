import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SavedDock({ items = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="relative">
        {/* Dock background */}
        <motion.div
          animate={{ height: isExpanded ? "auto" : "60px" }}
          className="bg-black/80 backdrop-blur-lg rounded-2xl border border-gray-800 shadow-xl p-2"
        >
          <div className="flex items-center space-x-2">
            {/* Toggle button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors"
            >
              {isExpanded ? "▼" : "▲"}
            </motion.button>

            {/* Saved items */}
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedItem(item)}
                  className="relative"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center overflow-hidden">
                    {item.icon || "📌"}
                  </div>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 rounded text-sm whitespace-nowrap"
                    >
                      {item.title}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 pt-2 border-t border-gray-800"
              >
                <div className="grid grid-cols-2 gap-2">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center">
                          {item.icon || "📌"}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

