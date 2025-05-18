import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRecommendations } from "../hooks/useRecommendations";
import { MatchScoreBadge } from "../components/MatchScoreBadge";
import { SavedDock } from "../components/SavedDock";
import { SidebarControls } from "../components/SidebarControls";
import { RecommendationCard } from "../components/RecommendationCard";

export function Profile() {
  const { recommendations, loading } = useRecommendations();
  const [activeTab, setActiveTab] = useState("activity");

  // Mock data for demonstration
  const mockUser = {
    displayName: "John Doe",
    email: "john@example.com",
    photoURL: "https://via.placeholder.com/150",
    matchScore: 85,
    stats: {
      recommendations: 12,
      saved: 25,
      shared: 8,
      matches: 15,
    },
  };

  const tabs = [
    { id: "activity", label: "Recent Activity" },
    { id: "saved", label: "Saved Items" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-6"
    >
      {/* Profile Header */}
      <div className="glass-card mb-8 p-6">
        <div className="flex items-center gap-6">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={mockUser.photoURL}
            alt={mockUser.displayName}
            className="h-24 w-24 rounded-full border-4 border-white/20"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">
              {mockUser.displayName}
            </h1>
            <p className="text-white/60">{mockUser.email}</p>
            <div className="mt-2">
              <MatchScoreBadge score={mockUser.matchScore} size="large" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(mockUser.stats).map(([key, value]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-4"
          >
            <h3 className="text-sm font-medium text-white/60">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <p className="text-2xl font-bold text-white">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass-card mb-8">
        <div className="flex border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "activity" && (
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-white/60">Loading...</div>
              ) : (
                recommendations.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))
              )}
            </div>
          )}
          {activeTab === "saved" && (
            <div className="text-center text-white/60">
              Saved items will appear here
            </div>
          )}
          {activeTab === "settings" && (
            <div className="text-center text-white/60">
              Settings will appear here
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed right-6 top-6">
        <SidebarControls />
      </div>

      {/* Saved Dock */}
      <SavedDock />
    </motion.div>
  );
}
