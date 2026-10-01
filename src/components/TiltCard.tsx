import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxRotation?: number; // Max degrees of tilt (subtle: 6-8 deg)
  scale?: number; // Slight elevation scale (e.g. 1.015)
  glare?: boolean;
}

export function TiltCard({
  children,
  className = '',
  onClick,
  maxRotation = 7,
  scale = 1.015,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  });
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1

      const normalizedX = (x - 0.5) * 2; // -1 to 1
      const normalizedY = (y - 0.5) * 2; // -1 to 1

      const rotateX = -normalizedY * maxRotation;
      const rotateY = normalizedX * maxRotation;

      setTransformStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
          2
        )}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 80ms ease-out',
      });

      if (glare) {
        setGlarePosition({
          x: Math.round(x * 100),
          y: Math.round(y * 100),
          opacity: 0.12,
        });
      }
    },
    [maxRotation, scale, glare, reducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (reducedMotion) return;
    if (glare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0.12 }));
    }
  }, [glare, reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion) return;
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
    });
    if (glare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [glare, reducedMotion]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Subtle dynamic sheen reflection overlay */}
      {glare && !reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(20, 184, 166, 0.25), transparent 70%)`,
            opacity: glarePosition.opacity,
          }}
        />
      )}
    </div>
  );
}
