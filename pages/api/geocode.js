export default async function handler(req, res) {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing q" });
  
    const key = process.env.OPENCAGE_API_KEY;
    if (!key) return res.status(500).json({ error: "No OPENCAGE_API_KEY set" });
  
    try {
      const r = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(q)}&key=${key}&limit=1`);
      const data = await r.json();
      return res.status(200).json({ results: data.results });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Geocoding failed" });
    }
  }
  