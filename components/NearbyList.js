"use client";
// components/NearbyList.jsx
// Shows results list; clicking an item will center map (handled via selectedId prop)

import React from "react";

export default function NearbyList({ places = [], onSelect }) {
  if (!places || places.length === 0) {
    return <div className="p-4 text-gray-500">No places found.</div>;
  }

  return (
    <div className="space-y-2 p-2 max-h-72 overflow-auto">
      {places.map((p) => (
        <div
          key={p.id}
          className="border rounded p-2 hover:bg-gray-50 cursor-pointer flex justify-between items-start"
          onClick={() => onSelect(p)}
        >
          <div>
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-gray-500">{p.tags?.["addr:street"] || p.tags?.village || ""}</div>
          </div>
          <div className="text-xs text-gray-400">{p.tags?.amenity || p.tags?.shop || ""}</div>
        </div>
      ))}
    </div>
  );
}
