import { useState } from "react";
import { DownloadCloud, Clock, Loader2, User, ImageOff } from "lucide-react";
import QualitySelector, { Quality } from "./QualitySelector";
import FormatSelector, { Format } from "./FormatSelector";
import PlatformLogo from "./PlatformLogo";
import { platformMeta, type Platform } from "@/lib/platforms";
import { cn } from "@/lib/utils";

interface Props {
  platform: Platform;
  thumbnail: string | null;
  fallbackThumbnail: string;
  title: string;
  uploader: string;
  duration: string;
  onDownload: (opts: { quality: Quality; format: Format }) => Promise<void> | void;
}

const ResultCard = ({
  platform,
  thumbnail,
  fallbackThumbnail,
  title,
  uploader,
  duration,
  onDownload,
}: Props) => {
  const [quality, setQuality] = useState<Quality>("1080p");
  const [format, setFormat] = useState<Format>("mp4");
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const meta = platformMeta[platform];
  const isAudio = format === "audio";

  const handleClick = async () => {
    setLoading(true);
    try {
      await onDownload({ quality, format });
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };

  const imgSrc = !thumbnail || imgError ? fallbackThumbnail : thumbnail;

  return (
    <section className="glass-card animate-fade-up mt-6 rounded-3xl p-6 md:p-8">
      {/* Platform header */}
      <header className="mb-5 flex items-center justify-between">
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md",
            meta.tagBg,
            meta.tagBorder
          )}
          style={{ boxShadow: `0 0 18px ${meta.color}30` }}
        >
          <PlatformLogo platform={platform} className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wide text-foreground">
            Detected on <span style={{ color: meta.color }}>{meta.name}</span>
          </span>
        </div>
        <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-neon-cyan md:inline">
          Ready to download
        </span>
      </header>

      {/* Details row */}
      <div className="grid gap-6 md:grid-cols-[280px_1fr] md:gap-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60">
          <img
            src={imgSrc}
            alt={title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="aspect-video h-full w-full object-cover"
            loading="lazy"
          />
          {(!thumbnail || imgError) && (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
              <ImageOff className="h-3 w-3" strokeWidth={2} />
              Preview
            </div>
          )}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
            <Clock className="h-3 w-3" strokeWidth={2} />
            {duration}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="line-clamp-2 text-xl font-semibold leading-snug text-foreground md:text-2xl">
            {title}
          </h3>

          <dl className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-neon-cyan" strokeWidth={2} />
              <dt className="sr-only">Uploader</dt>
              <dd className="font-medium text-foreground/90">{uploader}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-neon-cyan" strokeWidth={2} />
              <dt className="sr-only">Duration</dt>
              <dd>{duration}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Format selector */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Choose format
        </p>
        <FormatSelector value={format} onChange={setFormat} />
      </div>

      {/* Quality selector */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Choose quality
          </p>
          {isAudio && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Disabled for audio
            </span>
          )}
        </div>
        <QualitySelector value={quality} onChange={setQuality} disabled={isAudio} />
      </div>

      {/* Download */}
      <button
        onClick={handleClick}
        disabled={loading}
        className="group relative mt-5 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-neon-green to-emerald-400 px-6 py-4 text-base font-semibold text-success-foreground shadow-[0_0_30px_hsl(142_90%_50%/0.45)] transition-all duration-300 hover:shadow-[0_0_45px_hsl(142_90%_50%/0.7)] hover:brightness-110 disabled:opacity-80"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin-smooth" strokeWidth={2.5} />
            <span>Preparing your file…</span>
          </>
        ) : (
          <>
            <DownloadCloud className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" strokeWidth={2} />
            <span>
              Download {isAudio ? "Audio" : `${quality} · ${format.toUpperCase()}`}
            </span>
          </>
        )}
      </button>
    </section>
  );
};

export default ResultCard;
