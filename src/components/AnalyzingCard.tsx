const AnalyzingCard = () => {
  return (
    <section
      className="glass-card animate-fade-up mt-6 flex flex-col items-center justify-center rounded-3xl px-6 py-14"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-16 w-16">
        {/* Outer ring */}
        <svg className="absolute inset-0 animate-spin-smooth" viewBox="0 0 50 50">
          <defs>
            <linearGradient id="ldGrad" x1="0" y1="0" x2="50" y2="50">
              <stop offset="0%" stopColor="hsl(187 100% 60%)" />
              <stop offset="100%" stopColor="hsl(271 91% 70%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="25" cy="25" r="20" stroke="hsl(0 0% 100% / 0.06)" strokeWidth="3" fill="none" />
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="url(#ldGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="90 200"
            style={{ filter: "drop-shadow(0 0 6px hsl(187 100% 60% / 0.7))" }}
          />
        </svg>
        {/* Inner pulse dot */}
        <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_12px_hsl(187_100%_60%/0.9)] animate-pulse-glow" />
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
        Fetching metadata
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Analyzing the link and detecting the source platform…
      </p>
    </section>
  );
};

export default AnalyzingCard;
