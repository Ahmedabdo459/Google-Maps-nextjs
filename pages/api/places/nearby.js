// pages/api/places/nearby.js
export default async function handler(req, res) {
    const { lat, lon, radius = 1000, tag = "restaurant" } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "lat & lon required" });
  
    const base = process.env.NEXT_PUBLIC_OVERPASS_API || "https://overpass-api.de/api/interpreter";
    const q = `[out:json][timeout:25];
  (
    node["amenity"="${tag}"](around:${radius},${lat},${lon});
    way["amenity"="${tag}"](around:${radius},${lat},${lon});
    relation["amenity"="${tag}"](around:${radius},${lat},${lon});
  );
  out center;`;
  
    try {
      const r = await fetch(base, {
        method: "POST",
        body: q,
        headers: {
          "Content-Type": "text/plain",
          "User-Agent": "Ahmed-Nextjs-App/1.0 (your.email@example.com)"
        }
      });
      const data = await r.json();
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }