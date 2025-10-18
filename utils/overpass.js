// utils/overpass.js
const placeTypeMap = {
  restaurant: "restaurant",
  hospital: "hospital",
  school: "school",
  bank: "bank",
  fuel: "fuel",
  pharmacy: "pharmacy",
  mosque: "place_of_worship",
  hotel: "hotel",
  cafe: "cafe",
  park: "park",
  supermarket: "supermarket",
  library: "library",
  police: "police",
  fire: "fire_station",
};

export async function fetchNearbyPlaces(lat, lon, userInput, radius = 1500) {
  try {
    // map user input to a known type
    const type = placeTypeMap[userInput.toLowerCase()] || "restaurant";

    const query = `
      [out:json];
      (
        node["amenity"="${type}"](around:${radius},${lat},${lon});
        node["shop"="${type}"](around:${radius},${lat},${lon});
        node["tourism"="${type}"](around:${radius},${lat},${lon});
      );
      out body;
    `;

    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    const data = await response.json();
    console.log("Overpass API data:", data);

    if (!data.elements || data.elements.length === 0) {
      console.warn("⚠️ No places found for:", userInput);
      return [];
    }

    const results = data.elements.map((el) => ({
      id: el.id,
      lat: el.lat,
      lon: el.lon,
      name:
        el.tags?.name ||
        el.tags?.["name:en"] ||
        el.tags?.["addr:street"] ||
        "Unnamed place",
      type: el.tags?.amenity || el.tags?.shop || el.tags?.tourism,
    }));

    console.log("✅ Found places:", results);
    return results;
  } catch (error) {
    console.error("❌ Overpass API error:", error);
    return [];
  }
}
