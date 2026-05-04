const BackgroundBlobs = () => {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="blob animate-blob-1 bg-neon-blue" style={{ width: 600, height: 600, top: '-10%', left: '-10%' }} />
      <div className="blob animate-blob-2 bg-neon-purple" style={{ width: 700, height: 700, bottom: '-15%', right: '-15%' }} />
      <div className="blob animate-blob-3 bg-neon-cyan" style={{ width: 500, height: 500, top: '40%', left: '40%', opacity: 0.25 }} />
      {/* Subtle grain / vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(0_0%_0%/0.6)_100%)]" />
    </div>
  );
};

export default BackgroundBlobs;
