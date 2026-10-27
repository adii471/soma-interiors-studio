import React from 'react';
import { AlertTriangle, Compass } from 'lucide-react';

export default function WebGLFallback() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-[#0D0C0B] flex flex-col items-center justify-center p-8 text-center">
      {/* Editorial architectural background illustration */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-sm"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80')`
        }}
      />
      <div className="relative z-10 max-w-lg glass-panel p-8 rounded-xl border border-white/10 shadow-2xl">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-soma-bronze/10 border border-soma-bronze/30 flex items-center justify-center text-soma-bronze">
          <Compass className="w-6 h-6 animate-spin" />
        </div>
        <h2 className="font-display text-2xl tracking-widest text-soma-cream mb-2 uppercase">
          SOMA INTERIORS STUDIO
        </h2>
        <p className="text-soma-sandMuted text-sm leading-relaxed mb-6 font-sans">
          Hardware WebGL acceleration is unavailable in your browser. The 3D real-time spatial walkthrough is currently running in architectural preview mode.
        </p>
        <div className="text-xs font-mono text-soma-sand/60 border-t border-white/5 pt-4">
          Please enable WebGL 2.0 or hardware acceleration for the full real-time interactive experience.
        </div>
      </div>
    </div>
  );
}
