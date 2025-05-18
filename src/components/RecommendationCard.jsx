import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MatchScoreBadge from "./MatchScoreBadge";

export default function RecommendationCard({ recommendation }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    title,
    type,
    description,
    matchScore,
    sharedBy,
    image,
    tags = [],
  } = recommendation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-black/40 backdrop-blur-lg rounded-2xl border border-gray-800 overflow-hidden group"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Match Score Badge */}
        <div className="absolute top-4 right-4">
          <MatchScoreBadge score={matchScore} size="sm" />
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSaved(!isSaved)}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary/50 transition-colors"
        >
          {isSaved ? "❤️" : "🤍"}
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{type}</p>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Shared By Section */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {sharedBy.slice(0, 3).map((user) => (
                <div
                  key={user.id}
                  className="w-6 h-6 rounded-full border-2 border-black overflow-hidden"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-400">
              Shared by {sharedBy.length} friends
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
            >
              💬
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
            >
              🔗
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
