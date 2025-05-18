import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>
      <p className="text-lg text-gray-400 mb-6">Page not found</p>
      <Link to="/" className="text-primary hover:underline">Go back to Home</Link>
    </div>
  );
}