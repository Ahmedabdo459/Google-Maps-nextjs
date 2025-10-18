// src/auth/GlobalApi.js
const OVERPASS_BASE = process.env.NEXT_PUBLIC_OVERPASS_API || "https://overpass-api.de/api/interpreter";

/**
 * category: string (مثل "restaurant" أو "cafe" أو "pharmacy")
 * lat, lon: أرقام
 * radius: بالمتر
 */
const runOverpassQuery = async (lat, lon, category = "restaurant", radius = 1000) => {
  const q = `[out:json][timeout:25];
(
  node["amenity"="${category}"](around:${radius},${lat},${lon});
  way["amenity"="${category}"](around:${radius},${lat},${lon});
  relation["amenity"="${category}"](around:${radius},${lat},${lon});
);
out center;`;

  const res = await fetch(OVERPASS_BASE, {
    method: "POST",
    body: q,
    headers: { "Content-Type": "text/plain" },
  });

  if (!res.ok) throw new Error("Overpass request failed");
  const json = await res.json();
  return json;
};

const mapOverpassToResults = (overpassJson) => {
  const elements = overpassJson.elements || [];
  return elements.map((el) => {
    const lat = el.lat ?? el.center?.lat;
    const lon = el.lon ?? el.center?.lon;
    return {
      id: el.id,
      name: el.tags?.name || "Unnamed place",
      category: el.tags?.amenity || "Unknown",
      tags: el.tags || {},
      lat,
      lon,
    };
  });
};

const GlobalApi = {
  getNearbyPlaces: async (category = "restaurant", lat, lon, radius = 1000) => {
    const data = await runOverpassQuery(lat, lon, category, radius);
    const results = mapOverpassToResults(data);
    return { data: { results } };
  },
};

export default GlobalApi;
