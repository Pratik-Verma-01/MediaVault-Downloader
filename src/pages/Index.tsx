import { useState } from "react";
import { Clipboard, Link2, Search, Settings, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

import BackgroundBlobs from "@/components/BackgroundBlobs";
import Logo from "@/components/Logo";
import ResultCard from "@/components/ResultCard";
import AnalyzingCard from "@/components/AnalyzingCard";
import HistoryCard, { HistoryItem } from "@/components/HistoryCard";
import { Quality } from "@/components/QualitySelector";
import { Format } from "@/components/FormatSelector";
import { detectPlatform, platformMeta, type Platform } from "@/lib/platforms";
import { fetchThumbnail } from "@/lib/thumbnail";

import previewThumb from "@/assets/preview-thumb.jpg";
import hist1 from "@/assets/hist-1.jpg";
import hist2 from "@/assets/hist-2.jpg";
import hist3 from "@/assets/hist-3.jpg";

// PASTE YOUR VERCEL BACKEND URL HERE LATER
const BACKEND_URL = "https://media-vault-downloader-api.vercel.app/api/fetch";

interface VideoMetadata {
  platform: Platform;
  thumbnail: string | null;
  title: string;
  uploader: string;
  duration: string;
  source: string;
}

const uploaderByPlatform: Record<Platform, string> = {
  youtube: "Neon Studio",
  instagram: "@creator.studio",
  tiktok: "@viral.clips",
  twitter: "@dailyvids",
  generic: "Unknown Creator",
};

const initialHistory: HistoryItem[] = [
  { id: "1", title: "Late Night Walk Through Tokyo Streets", thumbnail: hist1, source: "instagram.com" },
  { id: "2", title: "Lo-Fi Beats to Study & Relax — Vol. 4", thumbnail: hist2, source: "tiktok.com" },
  { id: "3", title: "Sunset Aerial Footage 4K — California Coast", thumbnail: hist3, source: "twitter.com" },
];

const Index = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        toast.success("Link pasted from clipboard");
      }
    } catch {
      toast.error("Couldn't access the clipboard");
    }
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!url.trim()) {
      toast.error("Please paste a video link first.");
      return;
    }
    setMetadata(null);
    setIsLoading(true);

    const platform = detectPlatform(url);

    // Fetch the real thumbnail in parallel with our simulated latency.
    const [thumbnail] = await Promise.all([
      fetchThumbnail(url, platform),
      new Promise((r) => setTimeout(r, 1500)),
    ]);

    let source = "unknown";
    try {
      source = new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace("www.", "");
    } catch {
      /* keep "unknown" */
    }

    setMetadata({
      platform,
      thumbnail,
      title: `Sample Video Title from ${platformMeta[platform].name}`,
      uploader: uploaderByPlatform[platform],
      duration: "03:45",
      source,
    });
    setIsLoading(false);
  };

  const handleDownload = async ({ quality, format }: { quality: Quality; format: Format }) => {
    try {
      if (BACKEND_URL) {
        const res = await fetch(`${BACKEND_URL}/api/download`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, quality, format }),
        });
        if (!res.ok) throw new Error("Backend returned an error");
      } else {
        await new Promise((r) => setTimeout(r, 1300));
      }
      const label = format === "audio" ? "Audio (MP3)" : `${quality} · ${format.toUpperCase()}`;
      toast.success(`Download started — ${label}`);
      if (metadata) {
        setHistory((h) => [
          {
            id: crypto.randomUUID(),
            title: metadata.title,
            thumbnail: metadata.thumbnail ?? previewThumb,
            source: metadata.source,
          },
          ...h,
        ].slice(0, 3));
      }
    } catch (err) {
      toast.error("Download failed. Please try again.");
    }
  };

  const handleClearItem = (id: string) => {
    setHistory((h) => h.filter((i) => i.id !== id));
  };

  return (
    <>
      <BackgroundBlobs />

      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-6 md:px-8 md:py-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            aria-label="Settings"
            className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-muted-foreground backdrop-blur-md icon-glow hover:border-neon-cyan/40"
          >
            <Settings className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </header>

        {/* Hero / Hub */}
        <main className="flex flex-1 flex-col justify-center py-10 md:py-14">
          <section className="glass-card animate-fade-up rounded-3xl p-6 md:p-10">
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neon-cyan">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Lightning fast · No ads · Free
            </div>

            <h1 className="text-center text-4xl font-bold leading-tight tracking-tight text-gradient md:text-6xl">
              Download from Anywhere.
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground md:text-base">
              Paste your link below — Instagram, TikTok, Twitter, YouTube and more.
            </p>

            {/* Input group */}
            <form onSubmit={handleAnalyze} className="mx-auto mt-8 w-full max-w-2xl">
              <div className="glass-input flex items-center gap-2 rounded-2xl px-4 py-2">
                <Link2 className="h-5 w-5 flex-shrink-0 text-neon-cyan" strokeWidth={2} />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.instagram.com/p/..."
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none md:text-base"
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex flex-shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-foreground transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/10 md:text-sm"
                >
                  <Clipboard className="h-3.5 w-3.5" strokeWidth={2} />
                  Paste
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative mt-4 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 animate-pulse-glow hover:brightness-110 disabled:opacity-80"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin-smooth" strokeWidth={2.5} />
                    Analyzing link…
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 transition-transform group-hover:scale-110" strokeWidth={2.25} />
                    Analyze Link
                  </>
                )}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </form>
          </section>

          {/* Loading state */}
          {isLoading && <AnalyzingCard />}

          {/* Result */}
          {!isLoading && metadata && (
            <ResultCard
              platform={metadata.platform}
              thumbnail={metadata.thumbnail}
              fallbackThumbnail={previewThumb}
              title={metadata.title}
              uploader={metadata.uploader}
              duration={metadata.duration}
              onDownload={handleDownload}
            />
          )}

          {/* History */}
          <HistoryCard items={history} onClear={handleClearItem} />
        </main>

        <footer className="pb-2 pt-6 text-center text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} MediaVault. For personal use only.
        </footer>
      </div>
    </>
  );
};

export default Index;
