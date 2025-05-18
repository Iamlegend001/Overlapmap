import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Explorer() {
  const [activeTab, setActiveTab] = useState("graph");

  const tabs = [
    { id: "graph", label: "Graph View", icon: "📊" },
    { id: "list", label: "List View", icon: "📝" },
    { id: "stats", label: "Statistics", icon: "📈" },
  ];

  const recommendations = [
    { id: 1, title: "The Matrix", type: "Movie", shared: 3 },
    { id: 2, title: "Breaking Bad", type: "TV Show", shared: 5 },
    { id: 3, title: "1984", type: "Book", shared: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-6 md:p-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-800"
        >
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Your Recommendation Explorer
          </motion.h2>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Content based on active tab */}
          {activeTab === "graph" && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full h-[400px] bg-gray-800/30 rounded-xl border border-gray-700 flex items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-center relative z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                ></motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400"
                >
                  Loading visualization...
                </motion.p>
              </div>
            </motion.div>
          )}

          {activeTab === "list" && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {recommendations.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">{item.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary">{item.shared} shared</span>
                      <button className="p-2 hover:bg-gray-700/50 rounded-full transition-colors">
                        <span className="text-xl">💬</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "stats" && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { label: "Total Recommendations", value: "156", icon: "📚" },
                { label: "Shared Items", value: "42", icon: "🤝" },
                { label: "Active Friends", value: "12", icon: "👥" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
