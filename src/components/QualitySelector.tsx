import { cn } from "@/lib/utils";

export type Quality = "480p" | "720p" | "1080p" | "2160p";

interface Props {
  value: Quality;
  onChange: (q: Quality) => void;
  disabled?: boolean;
}

const options: { label: string; value: Quality }[] = [
  { label: "480p", value: "480p" },
  { label: "720p", value: "720p" },
  { label: "1080p", value: "1080p" },
  { label: "4K", value: "2160p" },
];

const QualitySelector = ({ value, onChange, disabled }: Props) => {
  return (
    <div
      className={cn(
        "inline-flex w-full rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md transition-opacity",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
              active
                ? "bg-gradient-to-r from-neon-cyan/90 to-neon-blue/90 text-primary-foreground shadow-[0_0_20px_hsl(187_100%_50%/0.4)]"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default QualitySelector;
