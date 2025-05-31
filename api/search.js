// /api/search.js

export default async function handler(req, res) {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  const GOOGLE_API_KEY = process.env.VITE_GOOGLE_API_KEY;

  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${GOOGLE_API_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error calling Google API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
