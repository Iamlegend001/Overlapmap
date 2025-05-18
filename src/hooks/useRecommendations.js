import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "./useAuth";

export function useRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recommendations
  const fetchRecommendations = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      let q = collection(db, "recommendations");

      // Apply filters
      if (filters.type && filters.type !== "all") {
        q = query(q, where("type", "==", filters.type));
      }

      // Apply sorting
      if (filters.sortBy === "recent") {
        q = query(q, orderBy("createdAt", "desc"));
      } else if (filters.sortBy === "popular") {
        q = query(q, orderBy("sharedBy", "desc"));
      } else {
        // Default: sort by match score
        q = query(q, orderBy("matchScore", "desc"));
      }

      // Apply limit
      q = query(q, limit(20));

      const querySnapshot = await getDocs(q);
      const recommendations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecommendations(recommendations);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new recommendation
  const addRecommendation = async (recommendation) => {
    try {
      setError(null);
      if (!user) throw new Error("User must be logged in");

      const docRef = await addDoc(collection(db, "recommendations"), {
        ...recommendation,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        sharedBy: [],
        comments: [],
        viewCount: 0,
        matchScore: 0,
      });

      // Update user stats
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "stats.recommendations": increment(1),
      });

      return docRef.id;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update recommendation
  const updateRecommendation = async (id, updates) => {
    try {
      setError(null);
      if (!user) throw new Error("User must be logged in");

      const recommendationRef = doc(db, "recommendations", id);
      await updateDoc(recommendationRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      // Update local state
      setRecommendations((prev) =>
        prev.map((rec) => (rec.id === id ? { ...rec, ...updates } : rec))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete recommendation
  const deleteRecommendation = async (id) => {
    try {
      setError(null);
      if (!user) throw new Error("User must be logged in");

      const recommendationRef = doc(db, "recommendations", id);
      await deleteDoc(recommendationRef);

      // Update user stats
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "stats.recommendations": increment(-1),
      });

      // Update local state
      setRecommendations((prev) => prev.filter((rec) => rec.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Share recommendation
  const shareRecommendation = async (id, platform) => {
    try {
      setError(null);
      if (!user) throw new Error("User must be logged in");

      const recommendationRef = doc(db, "recommendations", id);
      await updateDoc(recommendationRef, {
        sharedBy: arrayUnion(user.uid),
        [`shares.${platform}`]: increment(1),
      });

      // Update user stats
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "stats.shared": increment(1),
      });

      // Update local state
      setRecommendations((prev) =>
        prev.map((rec) =>
          rec.id === id
            ? {
                ...rec,
                sharedBy: [...rec.sharedBy, user.uid],
                shares: {
                  ...rec.shares,
                  [platform]: (rec.shares?.[platform] || 0) + 1,
                },
              }
            : rec
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Add comment to recommendation
  const addComment = async (id, content) => {
    try {
      setError(null);
      if (!user) throw new Error("User must be logged in");

      const comment = {
        id: Date.now().toString(),
        content,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        user: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      };

      const recommendationRef = doc(db, "recommendations", id);
      await updateDoc(recommendationRef, {
        comments: arrayUnion(comment),
      });

      // Update local state
      setRecommendations((prev) =>
        prev.map((rec) =>
          rec.id === id
            ? {
                ...rec,
                comments: [...(rec.comments || []), comment],
              }
            : rec
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    recommendations,
    loading,
    error,
    fetchRecommendations,
    addRecommendation,
    updateRecommendation,
    deleteRecommendation,
    shareRecommendation,
    addComment,
  };
}
