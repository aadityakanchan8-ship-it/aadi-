import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Camera, Video, Upload, Sparkles } from 'lucide-react';

interface DigitalMarketingBackgroundProps {
  opacity?: number;
}

export function DigitalMarketingBackground({ opacity = 0.65 }: DigitalMarketingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [videoMode, setVideoMode] = useState<'camera-shoot' | 'reel-stream' | 'marketing-mesh'>('camera-shoot');
  const [currentOpacity, setCurrentOpacity] = useState(opacity);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Still backdrop from user's camera shoot video footage
  const cameraShootImage = '/src/assets/images/aaditya_camera_shoot_bg_1790825451487.jpg';

  // Handle user uploading their exact video file locally
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setVideoMode('camera-shoot');
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Play/pause control effect
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Marketing Telemetry tags floating in background depth field
  const marketingMetrics = [
    { label: 'On Location', value: 'Media Production & Shoot', x: '10%', y: '24%' },
    { label: 'Telephoto Zoom', value: 'Canon 70-200mm f/2.8', x: '82%', y: '16%' },
    { label: 'Media Conclave', value: 'Live Event Coverage', x: '78%', y: '72%' },
    { label: 'Campaign Reach', value: '1.59M Multi-Channel', x: '8%', y: '78%' },
    { label: 'Video Strategy', value: 'Adikanshots Production', x: '45%', y: '88%' },
  ];

  // 60FPS Interactive Digital Marketing Node & Funnel Network
  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const NODE_COUNT = Math.min(28, Math.floor(width / 50));
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
      label?: string;
    }[] = [];

    const colors = [
      'rgba(20, 184, 166,', // teal
      'rgba(6, 182, 212,',  // cyan
      'rgba(56, 189, 248,', // sky blue
    ];

    const labels = ['Camera Reel', 'Telephoto', 'Meta Pixel', 'Audience', 'Media Hub', 'Adikanshots'];

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.4 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        label: i < labels.length ? labels[i] : undefined,
      });
    }

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // 1. Connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 170) {
            const lineAlpha = (1 - dist / 170) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(20, 184, 166, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 2. Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color} ${node.alpha})`;
        ctx.shadowColor = `${node.color} 0.5)`;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (node.label && width > 768) {
          ctx.font = '10px monospace';
          ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#060910]" />

      {/* 2. Primary Camera Shoot Video Background (User's Uploaded Video Experience) */}
      {videoMode === 'camera-shoot' && (
        <div
          className="absolute inset-0 overflow-hidden transition-opacity duration-1000"
          style={{ opacity: currentOpacity * 0.55 }}
        >
          {/* Real HTML5 Video element (plays custom uploaded video or local video loop) */}
          <video
            ref={videoRef}
            src={customVideoUrl || '/videos/aaditya-shoot.webm'}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover mix-blend-screen scale-105 filter contrast-125 brightness-95 transition-opacity duration-700 ${
              videoLoaded ? 'opacity-90' : 'opacity-0'
            }`}
          />

          {/* Cinematic High-Resolution Production Shoot Backdrop (Aaditya with Telephoto Lens) */}
          <div
            className={`absolute inset-0 bg-cover bg-center filter contrast-115 brightness-90 transition-transform duration-10000 ease-out scale-105 ${
              isPlaying ? 'animate-pulse' : ''
            }`}
            style={{
              backgroundImage: `url(${cameraShootImage})`,
              backgroundPosition: 'center 35%',
            }}
          />

          {/* Cinematic Light Bleed & Lens Glare Overlays */}
          <div className="absolute top-0 right-1/4 w-[45rem] h-[45rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      )}

      {/* 3. YouTube Video Reel Stream Option */}
      {videoMode === 'reel-stream' && isPlaying && (
        <div
          className="absolute inset-0 overflow-hidden transition-opacity duration-700"
          style={{ opacity: currentOpacity * 0.45 }}
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/Ue55YQUBWK4?autoplay=1&mute=1&controls=0&loop=1&playlist=Ue55YQUBWK4&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
            title="Digital Marketing Video Background"
            allow="autoplay; encrypted-media"
            className="w-[150%] h-[150%] -translate-x-[16%] -translate-y-[16%] object-cover pointer-events-none mix-blend-screen scale-110 filter contrast-125 saturate-150"
          />
        </div>
      )}

      {/* 4. Dynamic Digital Marketing Motion Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
        style={{ opacity: currentOpacity * 0.7 }}
      />

      {/* 5. Subtle Floating Telemetry HUD Tags */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {marketingMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="absolute rounded-lg bg-[#0d131f]/80 border border-teal-500/25 px-2.5 py-1 text-[10px] font-mono text-teal-300/80 backdrop-blur-sm shadow-lg pointer-events-none transition-transform duration-1000 animate-pulse"
            style={{
              left: metric.x,
              top: metric.y,
              animationDuration: `${3.8 + idx * 0.7}s`,
            }}
          >
            <span className="text-slate-400 block text-[9px] leading-tight font-sans">
              {metric.label}
            </span>
            <span className="font-bold text-teal-300">{metric.value}</span>
          </div>
        ))}
      </div>

      {/* 6. Measured Editorial Scrim (Ensures text remains 100% accessible & WCAG AA) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 95% 75% at 50% 35%, rgba(6, 9, 16, 0.45) 0%, rgba(6, 9, 16, 0.82) 65%, #07090e 100%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07090e] via-[#07090e]/75 to-transparent pointer-events-none" />

      {/* 7. Fine Technical Hairline Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #14b8a6 1px, transparent 1px), linear-gradient(to bottom, #14b8a6 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* 8. Interactive Background Controls (Top Right of Hero) */}
      <div className="absolute top-20 right-4 sm:right-8 z-30 pointer-events-auto flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          accept="video/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        <div className="bg-[#0b1018]/90 border border-teal-500/30 rounded-xl p-1.5 flex items-center gap-1.5 shadow-2xl backdrop-blur-md text-xs font-mono">
          {/* Play / Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 font-semibold transition-colors cursor-pointer"
            title={isPlaying ? 'Pause background' : 'Play background'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-teal-400" />
                <span className="text-[10px] hidden sm:inline">Camera Shoot Video</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-teal-400" />
                <span className="text-[10px] hidden sm:inline">Paused</span>
              </>
            )}
          </button>

          {/* Mode Switcher */}
          <button
            onClick={() => {
              const modes: ('camera-shoot' | 'reel-stream' | 'marketing-mesh')[] = [
                'camera-shoot',
                'reel-stream',
                'marketing-mesh',
              ];
              const next = modes[(modes.indexOf(videoMode) + 1) % modes.length];
              setVideoMode(next);
            }}
            className="px-2 py-1 rounded-md text-[10px] text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1"
            title="Switch Background View"
          >
            {videoMode === 'camera-shoot' ? (
              <>
                <Camera className="w-3 h-3 text-teal-400" />
                <span className="hidden sm:inline">Shoot View</span>
              </>
            ) : videoMode === 'reel-stream' ? (
              <>
                <Video className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">Video Reel</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span className="hidden sm:inline">Mesh Flow</span>
              </>
            )}
          </button>

          {/* Upload Custom Video Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-2 py-1 rounded-md text-[10px] text-teal-300 hover:text-white hover:bg-teal-500/20 border border-teal-500/20 transition-colors cursor-pointer flex items-center gap-1"
            title="Load your original video file directly"
          >
            <Upload className="w-3 h-3 text-teal-400" />
            <span className="hidden sm:inline">Load Video</span>
          </button>

          {/* Intensity Toggle */}
          <button
            onClick={() => {
              setCurrentOpacity((prev) => (prev >= 0.8 ? 0.35 : prev + 0.2));
            }}
            className="px-1.5 py-1 rounded-md text-[10px] text-slate-400 hover:text-teal-300 hover:bg-white/5 transition-colors cursor-pointer"
            title="Adjust background opacity"
          >
            {Math.round(currentOpacity * 100)}%
          </button>
        </div>
      </div>
    </div>
  );
}
