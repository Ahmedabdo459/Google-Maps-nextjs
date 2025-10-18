// components/LeafletMap.js
import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { UserLocationContext } from "@/context/UserLocationContext";
import { NearbyPlacesContext } from "@/context/NearbyPlacesContext";

// Fix default icon paths (works client-side)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: typeof window !== "undefined" ? require("leaflet/dist/images/marker-icon-2x.png") : "",
  iconUrl: typeof window !== "undefined" ? require("leaflet/dist/images/marker-icon.png") : "",
  shadowUrl: typeof window !== "undefined" ? require("leaflet/dist/images/marker-shadow.png") : ""
});

function LeafletMap() {
  const { userLocation } = useContext(UserLocationContext);
  const { nearbyPlaces } = useContext(NearbyPlacesContext);

  if (!userLocation) return <p>جارٍ تحديد موقعك...</p>;

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "500px", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Popup>📍 أنت هنا</Popup>
      </Marker>

      <Circle center={[userLocation.lat, userLocation.lng]} radius={1000} />

      {nearbyPlaces.map((place) => (
        <Marker key={place.id} position={[place.lat, place.lon]}>
          <Popup>
            <b>{place.name || "مكان بدون اسم"}</b>
            <br />
            {place.category || place.tags?.amenity || "—"}
            <br />
            {place.tags?.["addr:street"] ? place.tags["addr:street"] : ""}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default LeafletMap;
