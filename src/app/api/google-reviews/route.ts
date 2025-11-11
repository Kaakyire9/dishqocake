import { NextResponse } from "next/server";

type Review = {
  author_name: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
  profile_photo_url?: string;
  source_url?: string;
};

const MOCK_REVIEWS: Review[] = [
  { author_name: "Esi A.", rating: 5, relative_time_description: "a month ago", text: "Delicious cakes and prompt delivery — highly recommended!" },
  { author_name: "Kwame B.", rating: 5, relative_time_description: "3 months ago", text: "Stunning design and great taste. Our wedding cake was perfect." },
  { author_name: "Fafa M.", rating: 4, relative_time_description: "2 weeks ago", text: "Lovely cupcakes — I'll order again!" },
  { author_name: "Ama K.", rating: 5, relative_time_description: "yesterday", text: "Amazing flavor and beautiful decoration." },
  { author_name: "Kojo P.", rating: 4, relative_time_description: "a year ago", text: "Excellent service, minor delay but worth the wait." },
];

// Simple in-memory cache (module-level). Good enough for a single-instance deployment.
// TTL can be configured with GOOGLE_REVIEWS_CACHE_TTL_SECONDS (default 600s).
let _cache: { ts: number; reviews: Review[]; placeUrl?: string } | null = null;

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    const ttl = Number(process.env.GOOGLE_REVIEWS_CACHE_TTL_SECONDS ?? 600) * 1000;

    const now = Date.now();
    // return cached if fresh
    if (_cache && now - _cache.ts < ttl) {
      return NextResponse.json({ reviews: _cache.reviews, placeUrl: _cache.placeUrl });
    }

    const placeUrl = placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : undefined;

    if (!apiKey || !placeId) {
      // attach source_url to mocks
      const withSource = MOCK_REVIEWS.map((r) => ({ ...r, source_url: placeUrl }));
      _cache = { ts: now, reviews: withSource, placeUrl };
      return NextResponse.json({ reviews: withSource, placeUrl });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=review&key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url);
    if (!res.ok) {
      const withSource = MOCK_REVIEWS.map((r) => ({ ...r, source_url: placeUrl }));
      _cache = { ts: now, reviews: withSource, placeUrl };
      return NextResponse.json({ reviews: withSource, placeUrl });
    }

    const json = await res.json();
    // Google returns reviews under result.reviews
    const reviews = (json?.result?.reviews || []).map((r: unknown) => {
      const rr = r as Record<string, unknown>;
      return {
        author_name: String(rr.author_name ?? ""),
        rating: Number(rr.rating ?? 0),
        relative_time_description: rr.relative_time_description ? String(rr.relative_time_description) : undefined,
        text: rr.text ? String(rr.text) : undefined,
        profile_photo_url: rr.profile_photo_url ? String(rr.profile_photo_url) : undefined,
        source_url: placeUrl,
      } as Review;
    });

    const final = reviews.length > 0 ? reviews : MOCK_REVIEWS.map((r) => ({ ...r, source_url: placeUrl }));
    _cache = { ts: now, reviews: final, placeUrl };
    return NextResponse.json({ reviews: final, placeUrl });
  } catch {
    const placeUrl = process.env.GOOGLE_PLACE_ID ? `https://www.google.com/maps/place/?q=place_id:${process.env.GOOGLE_PLACE_ID}` : undefined;
    const withSource = MOCK_REVIEWS.map((r) => ({ ...r, source_url: placeUrl }));
    _cache = { ts: Date.now(), reviews: withSource, placeUrl };
    return NextResponse.json({ reviews: withSource, placeUrl });
  }
}
