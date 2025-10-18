// context/UserLocationContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserLocationContext = createContext({
  userLocation: null,
  setUserLocation: () => {}
});

export const UserLocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        console.warn("Geolocation error:", err);
        // optional fallback (مثال: القاهرة)
        // setUserLocation({ lat: 30.0444, lng: 31.2357 });
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};
