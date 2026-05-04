import type { Platform } from "./platforms";

/**
 * Best-effort thumbnail extraction that runs purely in the browser.
 * - YouTube: deterministic i.ytimg.com URL from the video ID (no network needed)
 * - Others: try the public noembed.com oEmbed proxy as a fallback
 * Returns `null` if no thumbnail could be resolved.
 */
export async function fetchThumbnail(url: string, platform: Platform): Promise<string | null> {
  try {
    if (platform === "youtube") {
      const id = extractYouTubeId(url);
      if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    }

    // Generic oEmbed proxy — supports YouTube, Vimeo, Twitter, TikTok, Instagram, etc.
    const oembed = await fetchJson(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
    const thumb = oembed?.thumbnail_url as string | undefined;
    if (thumb) return thumb;
  } catch {
    /* swallow — we'll just fall back to the placeholder */
  }
  return null;
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0] || null;
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) => ["embed", "shorts", "v"].includes(p));
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  } catch {
    /* ignore */
  }
  return null;
}

async function fetchJson(url: string): Promise<any | null> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 4000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}
