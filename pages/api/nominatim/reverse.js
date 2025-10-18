export default async function handler(req, res) {
    const { lat, lon } = req.query;
  
    if (!lat || !lon)
      return res.status(400).json({ error: "lat & lon required" });
  
    const base =
      process.env.NEXT_PUBLIC_OSM_API ||
      "https://nominatim.openstreetmap.org";
    const url = `${base}/reverse?lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&format=jsonv2`;
  
    try {
      const r = await fetch(url, {
        headers: {
          "User-Agent": "Ahmed-Nextjs-App/1.0 (your.email@example.com)",
        },
      });
  
      const data = await r.json();
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  