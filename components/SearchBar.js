"use client";
// components/SearchBar.jsx
// Search UI: select type + search button + radius input
import React from "react";

export default function SearchBar({ type, setType, radius, setRadius, onSearch, searching }) {
  return (
    <div className="bg-white rounded-xl shadow p-3 flex gap-2 items-center w-full max-w-2xl mx-auto">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded px-3 py-2 grow"
        aria-label="Place type"
      >
        <option value="restaurant">Restaurants</option>
        <option value="cafe">Cafes</option>
        <option value="pharmacy">Pharmacies</option>
        <option value="hospital">Hospitals</option>
        <option value="school">Schools</option>
        <option value="bank">Banks</option>
        <option value="fuel">Fuel Stations</option>
        <option value="mosque">Mosques</option>
      </select>

      <input
        type="number"
        min={200}
        max={5000}
        step={100}
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
        className="w-28 border rounded px-3 py-2 text-sm"
        aria-label="Search radius in meters"
      />

      <button
        onClick={onSearch}
        disabled={searching}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {searching ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
