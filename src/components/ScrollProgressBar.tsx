import { useState, useEffect } from 'react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Calculate dynamic hue from teal (168) through cyan (195), blue (220), violet (270) to amber/rose (340)
  const currentHue = Math.round(168 + (scrollProgress / 100) * 160);
  const glowColor = `hsla(${currentHue}, 90%, 55%, 0.65)`;

  return (
    <div
      role="progressbar"
      aria-label="Page scroll depth"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] w-full bg-black/25 pointer-events-none select-none"
    >
      {/* Progress Track Fill */}
      <div
        className="h-full transition-all duration-100 ease-out relative"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, #14b8a6 0%, #06b6d4 30%, #38bdf8 55%, #818cf8 75%, #c084fc 90%, #f472b6 100%)`,
          boxShadow: `0 0 10px ${glowColor}, 0 0 4px ${glowColor}`,
        }}
      >
        {/* Leading edge energetic spark / glow */}
        {scrollProgress > 1 && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[5px] rounded-full blur-[1px] -mr-1"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: `0 0 8px #ffffff, 0 0 12px ${glowColor}`,
            }}
          />
        )}
      </div>
    </div>
  );
}
