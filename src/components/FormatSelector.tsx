import { Film, Music2, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export type Format = "mp4" | "webm" | "audio";

interface Props {
  value: Format;
  onChange: (f: Format) => void;
}

const options: { label: string; value: Format; Icon: typeof Film; ext: string }[] = [
  { label: "MP4", value: "mp4", Icon: Film, ext: ".mp4" },
  { label: "WebM", value: "webm", Icon: Video, ext: ".webm" },
  { label: "Audio", value: "audio", Icon: Music2, ext: ".mp3" },
];

const FormatSelector = ({ value, onChange }: Props) => {
  return (
    <div className="inline-flex w-full rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
      {options.map(({ label, value: v, Icon, ext }) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={cn(
              "group relative flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300",
              active
                ? "bg-gradient-to-r from-neon-purple/80 to-neon-blue/80 text-foreground shadow-[0_0_20px_hsl(271_91%_65%/0.45)]"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon
              className={cn("h-4 w-4 transition-colors", active ? "text-foreground" : "text-muted-foreground group-hover:text-neon-cyan")}
              strokeWidth={2}
            />
            <span>{label}</span>
            <span className="hidden text-[10px] font-normal opacity-60 sm:inline">{ext}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FormatSelector;
