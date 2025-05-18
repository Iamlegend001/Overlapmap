import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  recommendations: [],
  savedItems: [],
  filters: {
    type: "all",
    sortBy: "match",
    searchQuery: "",
  },
  theme: {
    mode: "dark",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
  },
  user: null,
  loading: false,
  error: null,
};

// Action types
const ActionTypes = {
  SET_RECOMMENDATIONS: "SET_RECOMMENDATIONS",
  ADD_RECOMMENDATION: "ADD_RECOMMENDATION",
  UPDATE_RECOMMENDATION: "UPDATE_RECOMMENDATION",
  DELETE_RECOMMENDATION: "DELETE_RECOMMENDATION",
  TOGGLE_SAVE_ITEM: "TOGGLE_SAVE_ITEM",
  SET_FILTERS: "SET_FILTERS",
  SET_THEME: "SET_THEME",
  SET_USER: "SET_USER",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: action.payload,
        loading: false,
        error: null,
      };

    case ActionTypes.ADD_RECOMMENDATION:
      return {
        ...state,
        recommendations: [...state.recommendations, action.payload],
      };

    case ActionTypes.UPDATE_RECOMMENDATION:
      return {
        ...state,
        recommendations: state.recommendations.map((rec) =>
          rec.id === action.payload.id ? { ...rec, ...action.payload } : rec
        ),
      };

    case ActionTypes.DELETE_RECOMMENDATION:
      return {
        ...state,
        recommendations: state.recommendations.filter(
          (rec) => rec.id !== action.payload
        ),
      };

    case ActionTypes.TOGGLE_SAVE_ITEM:
      const itemId = action.payload;
      const isSaved = state.savedItems.includes(itemId);
      return {
        ...state,
        savedItems: isSaved
          ? state.savedItems.filter((id) => id !== itemId)
          : [...state.savedItems, itemId],
      };

    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: { ...state.theme, ...action.payload },
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem("savedItems");
    if (savedItems) {
      dispatch({
        type: ActionTypes.SET_SAVED_ITEMS,
        payload: JSON.parse(savedItems),
      });
    }
  }, []);

  // Save items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(state.savedItems));
  }, [state.savedItems]);

  // Context value
  const value = {
    state,
    dispatch,
    actions: {
      setRecommendations: (recommendations) =>
        dispatch({
          type: ActionTypes.SET_RECOMMENDATIONS,
          payload: recommendations,
        }),
      addRecommendation: (recommendation) =>
        dispatch({
          type: ActionTypes.ADD_RECOMMENDATION,
          payload: recommendation,
        }),
      updateRecommendation: (recommendation) =>
        dispatch({
          type: ActionTypes.UPDATE_RECOMMENDATION,
          payload: recommendation,
        }),
      deleteRecommendation: (id) =>
        dispatch({ type: ActionTypes.DELETE_RECOMMENDATION, payload: id }),
      toggleSaveItem: (id) =>
        dispatch({ type: ActionTypes.TOGGLE_SAVE_ITEM, payload: id }),
      setFilters: (filters) =>
        dispatch({ type: ActionTypes.SET_FILTERS, payload: filters }),
      setTheme: (theme) =>
        dispatch({ type: ActionTypes.SET_THEME, payload: theme }),
      setUser: (user) =>
        dispatch({ type: ActionTypes.SET_USER, payload: user }),
      setLoading: (loading) =>
        dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
      setError: (error) =>
        dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook for using the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Export action types for use in other files
export { ActionTypes };
