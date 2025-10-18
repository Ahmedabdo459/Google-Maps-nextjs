// context/SelectedNearbyPlacesContext.js
import { createContext } from "react";

export const SelectedNearbyPlacesContext = createContext({
  selectedNearbyPlaces: [],
  setSelectedNearbyPlaces: () => {}
});
