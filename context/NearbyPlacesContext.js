// context/NearbyPlacesContext.js
import { createContext } from "react";

export const NearbyPlacesContext = createContext({
  nearbyPlaces: [],
  setNearbyPlaces: () => {}
});
