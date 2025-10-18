// components/NearbyPlaces.js
import React, { useContext } from "react";
import { NearbyPlacesContext } from "@/context/NearbyPlacesContext";
import NearbyPlacesDetails from "@/components/NearbyPlacesDetails";

function NearbyPlaces() {
  const { nearbyPlaces } = useContext(NearbyPlacesContext);
  

  return (
    <div>
      <h2 className="text-blue-600 font-bold mt-4 text-[20px]">Nearby places</h2>
      <div className="mt-3">
        {nearbyPlaces && nearbyPlaces.length > 0 ? (
          nearbyPlaces.map((place) => <NearbyPlacesDetails key={place.id} item={place} />)
        ) : (
          <p className="text-gray-500">لا توجد أماكن قريبة للعرض.</p>
        )}
      </div>
    </div>
  );
}

export default NearbyPlaces;
