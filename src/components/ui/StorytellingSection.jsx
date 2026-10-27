import React, { useState } from 'react';
import { MATERIAL_SPECS } from '../../data/projectsData';
import { Eye, Sparkles, Layers, Compass, Wind, ShieldCheck } from 'lucide-react';

export default function StorytellingSection({ onSelectMaterial }) {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_SPECS[0]);

  return (
    <section id="storytelling" className="relative z-20 bg-[#0D0C0B] py-32 px-6 md:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-soma-bronze mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spatial Philosophy</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-soma-cream max-w-2xl leading-tight">
              Honoring raw materiality, <br />
              <span className="italic font-normal text-gold-gradient">sculpting quietude.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-soma-sandMuted max-w-md font-light leading-relaxed">
            At SOMA, we do not decorate volumes. We reveal their structural essence through unhurried proportion, natural light choreography, and materials that mature with dignity.
          </p>
        </div>

        {/* 3 Core Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-soma-bronze/30 transition-all group">
            <span className="font-mono text-xs text-soma-bronze block mb-4">01 / PROPORTIONAL RESTRAINT</span>
            <h3 className="font-serif text-2xl font-light text-soma-cream mb-3 group-hover:text-soma-accent transition-colors">
              Monolithic Volumes
            </h3>
            <p className="font-sans text-xs md:text-sm text-soma-sandMuted leading-relaxed">
              Every room is calibrated using classical architectural Golden Ratios, removing superfluous ornament so that light and volume become the primary protagonists.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-soma-bronze/30 transition-all group">
            <span className="font-mono text-xs text-soma-bronze block mb-4">02 / TACTILE AUTHENTICITY</span>
            <h3 className="font-serif text-2xl font-light text-soma-cream mb-3 group-hover:text-soma-accent transition-colors">
              Material Sincerity
            </h3>
            <p className="font-sans text-xs md:text-sm text-soma-sandMuted leading-relaxed">
              We exclusively specify unlacquered metals that develop natural patina, cross-cut open-pore limestone, and sustainably harvested smoked hardwoods.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-soma-bronze/30 transition-all group">
            <span className="font-mono text-xs text-soma-bronze block mb-4">03 / CIRCADIAN HARMONY</span>
            <h3 className="font-serif text-2xl font-light text-soma-cream mb-3 group-hover:text-soma-accent transition-colors">
              Living Illumination
            </h3>
            <p className="font-sans text-xs md:text-sm text-soma-sandMuted leading-relaxed">
              Lighting is designed as an architectural instrument: concealed perimeter cove illumination, soft graze lighting, and warm 2700K low-glare point sources.
            </p>
          </div>
        </div>

        {/* Interactive Tactile Materiality Library */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-8 border-b border-white/10 gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-soma-bronze">
                Tactile Library
              </span>
              <h3 className="font-serif text-3xl font-light text-soma-cream mt-1">
                Curated Natural Mediums
              </h3>
            </div>
            {/* Swatch Navigation Tabs */}
            <div className="flex flex-wrap gap-2">
              {MATERIAL_SPECS.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    selectedMaterial.id === mat.id
                      ? 'bg-soma-sand text-black font-semibold shadow-md'
                      : 'glass-pill text-soma-sandMuted hover:text-soma-cream'
                  }`}
                >
                  {mat.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Material Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            {/* Swatch Color Visual Block */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-white/10 h-72 shadow-xl flex flex-col justify-between p-6"
                 style={{ backgroundColor: selectedMaterial.palette }}>
              <div className="self-end bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-soma-cream">
                Specimen #{selectedMaterial.id.toUpperCase()}
              </div>
              <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="font-serif text-lg text-white font-medium">{selectedMaterial.name}</div>
                <div className="text-xs font-mono text-soma-sandMuted">{selectedMaterial.finish}</div>
              </div>
            </div>

            {/* Spec Details & Technical Notes */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <div className="flex items-center space-x-3 text-xs font-mono text-soma-bronze uppercase">
                <Compass className="w-4 h-4" />
                <span>Geographic Provenance: {selectedMaterial.origin}</span>
              </div>

              <p className="font-sans text-base text-soma-sand/90 font-light leading-relaxed">
                {selectedMaterial.description}
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
                <div>
                  <span className="block text-soma-sandMuted font-mono uppercase text-[10px]">Processing</span>
                  <span className="text-soma-cream font-medium">Precision CNC & Hand-Honed Polish</span>
                </div>
                <div>
                  <span className="block text-soma-sandMuted font-mono uppercase text-[10px]">Acoustic Absorption</span>
                  <span className="text-soma-cream font-medium">Optimized for Whisper Acoustics</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectMaterial(selectedMaterial.id)}
                  className="px-6 py-2.5 rounded-full bg-soma-bronze text-black hover:bg-soma-sand transition-colors font-mono text-xs uppercase tracking-widest font-semibold"
                >
                  Inspect Full Specification Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
