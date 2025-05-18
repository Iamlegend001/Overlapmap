import { useState, useCallback } from "react";
import { useApp } from "../context/AppContext";

export function useRecommendation(recommendationId) {
  const { state, actions } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Find the recommendation in the global state
  const recommendation = state.recommendations.find(
    (rec) => rec.id === recommendationId
  );

  // Check if the recommendation is saved
  const isSaved = state.savedItems.includes(recommendationId);

  // Toggle save state
  const toggleSave = useCallback(async () => {
    if (!recommendation) return;

    try {
      setIsSaving(true);
      // TODO: Replace with actual API call
      await fetch(`/api/recommendations/${recommendationId}/save`, {
        method: isSaved ? "DELETE" : "POST",
      });
      actions.toggleSaveItem(recommendationId);
    } catch (error) {
      console.error("Error toggling save state:", error);
    } finally {
      setIsSaving(false);
    }
  }, [recommendationId, isSaved, actions]);

  // Share recommendation
  const shareRecommendation = useCallback(
    async (platform) => {
      if (!recommendation) return;

      try {
        // TODO: Replace with actual API call
        await fetch(`/api/recommendations/${recommendationId}/share`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ platform }),
        });
      } catch (error) {
        console.error("Error sharing recommendation:", error);
      }
    },
    [recommendationId, recommendation]
  );

  // Add comment
  const addComment = useCallback(
    async (comment) => {
      if (!recommendation) return;

      try {
        // TODO: Replace with actual API call
        const response = await fetch(
          `/api/recommendations/${recommendationId}/comments`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: comment }),
          }
        );
        const data = await response.json();

        // Update the recommendation with the new comment
        actions.updateRecommendation({
          ...recommendation,
          comments: [...(recommendation.comments || []), data],
        });
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    },
    [recommendationId, recommendation, actions]
  );

  // Rate recommendation
  const rateRecommendation = useCallback(
    async (rating) => {
      if (!recommendation) return;

      try {
        // TODO: Replace with actual API call
        const response = await fetch(
          `/api/recommendations/${recommendationId}/rate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating }),
          }
        );
        const data = await response.json();

        // Update the recommendation with the new rating
        actions.updateRecommendation({
          ...recommendation,
          userRating: data.rating,
          averageRating: data.averageRating,
        });
      } catch (error) {
        console.error("Error rating recommendation:", error);
      }
    },
    [recommendationId, recommendation, actions]
  );

  // Get recommendation statistics
  const stats = recommendation
    ? {
        viewCount: recommendation.viewCount || 0,
        shareCount: recommendation.sharedBy?.length || 0,
        commentCount: recommendation.comments?.length || 0,
        averageRating: recommendation.averageRating || 0,
        userRating: recommendation.userRating || 0,
      }
    : null;

  return {
    recommendation,
    isSaved,
    isSaving,
    isExpanded,
    isHovered,
    stats,
    setIsExpanded,
    setIsHovered,
    toggleSave,
    shareRecommendation,
    addComment,
    rateRecommendation,
  };
}
