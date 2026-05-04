const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(187 100% 60%)" />
              <stop offset="1" stopColor="hsl(271 91% 70%)" />
            </linearGradient>
            <filter id="vGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="20" cy="20" r="18" stroke="url(#vGrad)" strokeWidth="1.5" opacity="0.6" />
          <circle cx="20" cy="20" r="18" stroke="hsl(187 100% 70% / 0.2)" strokeWidth="3" />
          <path
            d="M11 13 L20 28 L29 13"
            stroke="url(#vGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#vGlow)"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">MediaVault</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">downloader</span>
      </div>
    </div>
  );
};

export default Logo;
