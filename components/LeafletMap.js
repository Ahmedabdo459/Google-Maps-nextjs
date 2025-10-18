"use client";
// components/LeafletMap.jsx
// Leaflet map component (client-side only).
// Props:
// - center: [lat, lon]
// - places: array of { id, name, lat, lon, tags }
// - selectedId: currently selected place id (optional)
// - onMarkerClick: callback(place) when a marker is clicked

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Default marker icon (CDN hosted image avoids SSR require issues)
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Helper component to update view
function FlyTo({ position, zoom = 15 }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom, { duration: 0.6 });
    }
  }, [map, position, zoom]);
  return null;
}

export default function LeafletMap({ center, places = [], selectedId = null, onMarkerClick = () => {} }) {
  const mapRef = useRef(null);

  // Show a small circle radius if you want (uncomment if needed)
  // import Circle from 'react-leaflet' and add <Circle center={center} radius={1500} ... />

  return (
    <div style={{ height: "100%", minHeight: "420px" }}>
      <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }} whenCreated={(m) => (mapRef.current = m)}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* User location marker */}
        <Marker position={center} icon={defaultIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Nearby places */}
        {places.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lon]}
            icon={defaultIcon}
            eventHandlers={{
              click: () => onMarkerClick(p),
            }}
          >
            <Popup>
              <strong>{p.name}</strong>
              {p.tags?.amenity && <div style={{ fontSize: 12 }}>{p.tags.amenity}</div>}
              {p.tags?.["addr:street"] && <div style={{ fontSize: 12 }}>{p.tags["addr:street"]}</div>}
            </Popup>
          </Marker>
        ))}

        {/* Fly to selected place */}
        {selectedId && (() => {
          const selected = places.find((x) => x.id === selectedId);
          if (selected) return <FlyTo position={[selected.lat, selected.lon]} zoom={17} />;
          return null;
        })()}
      </MapContainer>
    </div>
  );
}
