import React from "react";
import { motion } from "framer-motion";

export default function MatchScoreBadge({ score, size = "md" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    if (score >= 40) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`relative ${
        sizeClasses[size]
      } rounded-full bg-gradient-to-br ${getScoreColor(
        score
      )} flex items-center justify-center font-bold text-white shadow-lg`}
    >
      <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
      <span className="relative z-10">{score}%</span>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
