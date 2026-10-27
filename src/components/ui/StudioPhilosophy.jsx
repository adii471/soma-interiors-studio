import React from 'react';
import { Compass, Sparkles, Box, Check, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function StudioPhilosophy({ onOpenConsultation }) {
  const steps = [
    {
      num: '01',
      title: 'Volumetric Discovery',
      desc: 'We analyze natural solar paths, wind circulation, and client living rituals to define architectural volumes before drawing a single wall.'
    },
    {
      num: '02',
      title: 'Material Calibration',
      desc: 'Physical quarry samples of travertine, marble, and aged timber are curated and assessed under dynamic daylight temperatures.'
    },
    {
      num: '03',
      title: 'Artisanal Fabrication',
      desc: 'Master Italian joiners and stonemasons craft bespoke millwork, fluted partitions, and integrated brass hardware to millimeter tolerances.'
    },
    {
      num: '04',
      title: 'Turnkey Commissioning',
      desc: 'Complete acoustic fine-tuning, circadian lighting programming, and curation of collectible design objects for immediate habitation.'
    }
  ];

  return (
    <section id="atelier" className="relative z-20 bg-[#0B0A09] py-32 px-6 md:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Atelier Header */}
        <div className="max-w-3xl mb-24">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-soma-bronze mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>The Atelier</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-soma-cream mb-6">
            Architecture at the <br />
            <span className="italic font-normal text-gold-gradient">intimate human scale.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-soma-sandMuted font-light leading-relaxed">
            Founded with locations in Milan, New York, and Tokyo, SOMA INTERIORS STUDIO operates as a bespoke architectural laboratory. We design residences that defy cyclical fashion, cultivating calm in an overstimulated world.
          </p>
        </div>

        {/* 4-Step Atelier Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
          {steps.map((step) => (
            <div key={step.num} className="glass-panel p-8 rounded-2xl border border-white/5 relative group hover:border-soma-bronze/30 transition-all">
              <span className="font-mono text-2xl font-light text-soma-bronze/60 block mb-6 group-hover:text-soma-bronze transition-colors">
                {step.num}
              </span>
              <h3 className="font-serif text-xl font-light text-soma-cream mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-xs text-soma-sandMuted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 3D Real-Time Spatial Engine Documentation Card (Mandatory Requirement explanation) */}
        <div className="glass-panel-warm p-8 md:p-12 rounded-3xl border border-soma-bronze/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-soma-bronze/20 text-soma-bronze text-xs font-mono tracking-widest uppercase mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>3D Architectural Technology</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-soma-cream mb-3">
                Real-Time Spatial Camera Choreography
              </h3>
              <p className="font-sans text-xs sm:text-sm text-soma-sand/90 font-light leading-relaxed mb-4">
                This experience is built on Three.js, React Three Fiber, and GSAP ScrollTrigger. The camera movement, perspective interpolation, and material reflections are computed in real time on the GPU, directly responding to scroll velocity in both directions.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-soma-bronze">
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Procedural PBR Shading</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Bidirectional Scroll Scrubbing</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Custom GLTF/GLB Ready</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-3 w-full lg:w-auto">
              <button
                onClick={onOpenConsultation}
                className="px-8 py-4 rounded-full bg-soma-sand text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-soma-bronze transition-all shadow-xl text-center"
              >
                Inquire For Private Residence
              </button>
              <span className="text-[10px] font-mono text-soma-sandMuted text-center">
                Currently booking projects for 2025–2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
