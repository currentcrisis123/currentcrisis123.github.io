// netlify/functions/warm-render.mjs
export default async (req) => {
  try {
    // Netlify passes the next scheduled run in the request body if you need it:
    // const { next_run } = await req.json();

    const url = process.env.RENDER_HEALTH_URL; // set this in Netlify env
    if (!url) throw new Error("Missing RENDER_HEALTH_URL");

    // Use GET (or HEAD if your /health supports it)
    const res = await fetch(url, { method: "GET" });
    console.log("Warmed:", url, res.status, res.statusText);
  } catch (err) {
    console.error("Warmup error:", err);
  }
};

export const config = { schedule: "*/10 * * * *" };

