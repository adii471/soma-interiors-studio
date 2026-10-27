import React from 'react';
import { ChevronDown, Compass, Sparkles } from 'lucide-react';

export default function HeroOverlay({ scrollProgress = 0, onStartExplore }) {
  // Fade out hero when scrolling begins (from 0 to 0.12)
  const opacity = Math.max(0, 1 - scrollProgress * 7);
  const translateY = scrollProgress * 140;

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(-${translateY}px)`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none'
      }}
      className="fixed inset-0 z-20 flex flex-col justify-between px-6 md:px-16 pt-32 pb-12 select-none transition-opacity duration-200"
    >
      {/* Top Tagline / Atelier Label */}
      <div className="flex items-center space-x-3 text-xs tracking-ultra uppercase text-soma-sandMuted">
        <span className="w-8 h-[1px] bg-soma-bronze" />
        <span className="font-mono text-soma-sand">Atelier of Architectural Interior Design</span>
      </div>

      {/* Center Cinematic Typography */}
      <div className="max-w-4xl">
        <div className="inline-flex items-center space-x-2 mb-4 px-3 py-1 rounded-full glass-pill border border-soma-bronze/20 text-soma-bronze text-xs tracking-widest uppercase">
          <Sparkles className="w-3 h-3" />
          <span>SOMA INTERIORS STUDIO</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-soma-warmWhite leading-[1.05] mb-6">
          Spaces that <br />
          <span className="italic font-normal text-gold-gradient">feel like home.</span>
        </h1>

        <p className="font-sans text-base sm:text-lg md:text-xl text-soma-sandMuted max-w-xl font-light leading-relaxed tracking-wide">
          Designed to stay timeless. We choreograph light, tactile materiality, and spatial proportion to evoke deep emotional resonance.
        </p>
      </div>

      {/* Bottom Row: Key Metrics & Scroll to Explore Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/10 pt-6">
        <div className="flex items-center space-x-8 text-xs font-mono text-soma-sandMuted">
          <div>
            <span className="block text-soma-cream font-medium">MILAN · NY · TOKYO</span>
            <span className="text-[10px] text-soma-sandMuted/70">GLOBAL RESIDENTIAL ATELIER</span>
          </div>
          <div className="hidden sm:block w-[1px] h-6 bg-white/10" />
          <div className="hidden sm:block">
            <span className="block text-soma-cream font-medium">REAL-TIME 3D</span>
            <span className="text-[10px] text-soma-sandMuted/70">SPATIAL CHOREOGRAPHY</span>
          </div>
        </div>

        {/* Scroll to Explore Interactive Indicator */}
        <button
          onClick={onStartExplore}
          className="group flex items-center space-x-4 cursor-pointer self-start sm:self-auto"
        >
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-mono tracking-widest text-soma-sandMuted group-hover:text-soma-bronze transition-colors">
              Scroll To Explore
            </span>
            <span className="text-[9px] text-soma-sandMuted/60">
              Interactive 3D Living Room
            </span>
          </div>
          <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center group-hover:border-soma-bronze/50 group-hover:bg-soma-bronze/10 transition-all duration-300">
            <ChevronDown className="w-4 h-4 text-soma-sand group-hover:text-soma-bronze animate-bounce" />
          </div>
        </button>
      </div>
    </div>
  );
}
