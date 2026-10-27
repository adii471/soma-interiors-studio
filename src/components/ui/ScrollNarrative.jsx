import React from 'react';
import { Layers, Sparkles, MoveRight, Compass } from 'lucide-react';

export default function ScrollNarrative({ scrollProgress = 0, onSelectMaterial }) {
  // Define narrative stages based on scrub progress (0.0 to 1.0)
  const stages = [
    {
      id: 1,
      min: 0.10,
      max: 0.34,
      zone: '01 / RESIDENTIAL VOLUMES',
      title: 'The Living Sanctuary',
      subtitle: 'Curved Bouclé & Organic Ergonomics',
      description: 'Choreographed around an asymmetrical low-profile curved sofa. Upholstered in tactile Italian bouclé wool, every contour invites conversation and unhurried rest.',
      specs: [
        { label: 'Upholstery', val: 'Italian Bouclé (Merino)' },
        { label: 'Table Stone', val: 'Navona Travertine' },
        { label: 'Acoustics', val: 'High Absorption Loop' }
      ],
      side: 'left',
      action: { label: 'Inspect Travertine', materialId: 'travertine' }
    },
    {
      id: 2,
      min: 0.35,
      max: 0.59,
      zone: '02 / TACTILE RELIEF',
      title: 'Material Alchemy',
      subtitle: 'Fluted Walnut & Roman Travertine Niche',
      description: 'An architectural feature wall combining vertical smoked walnut battens with a backlit inset travertine shelf, diffusing light and delivering tactile depth.',
      specs: [
        { label: 'Millwork', val: 'Smoked American Walnut' },
        { label: 'Shelf Ledge', val: 'Cross-cut Roman Travertine' },
        { label: 'Lighting', val: '2700K Hidden Linear Cove' }
      ],
      side: 'right',
      action: { label: 'Inspect Fluted Walnut', materialId: 'walnut' }
    },
    {
      id: 3,
      min: 0.60,
      max: 0.83,
      zone: '03 / SOCIAL ARCHITECTURE',
      title: 'The Culinary Hearth',
      subtitle: 'Monolithic Stone & Sculptural Brass',
      description: 'Transitioning beyond the architectural slatted screen divider, the dining zone is anchored by a dark honed stone table and a cluster of brushed champagne brass pendants.',
      specs: [
        { label: 'Tabletop', val: 'Honed Pietra Slate' },
        { label: 'Chandelier', val: 'Brushed Champagne Brass' },
        { label: 'Seating', val: 'Sculptural Minimalist 4-Top' }
      ],
      side: 'left',
      action: { label: 'Inspect Brass Alloy', materialId: 'brass' }
    },
    {
      id: 4,
      min: 0.84,
      max: 1.00,
      zone: '04 / PRIVATE SANCTUARY',
      title: 'The Restful Suite',
      subtitle: 'Stepped Platform & Circadian Lighting',
      description: 'An elevated wooden platform houses a floating low-slung king bed with an integrated slatted headboard wall and warm frosted spherical bedside sconces.',
      specs: [
        { label: 'Platform', val: 'Smoked Oak Flooring' },
        { label: 'Textiles', val: 'Raw Belgian Washed Linen' },
        { label: 'Illumination', val: 'Circadian Dim-to-Warm' }
      ],
      side: 'right',
      action: { label: 'Inspect Bouclé Wool', materialId: 'boucle' }
    }
  ];

  // Determine current active stage
  const activeStage = stages.find((s) => scrollProgress >= s.min && scrollProgress <= s.max);

  // If before first stage (in hero), don't render narrative cards
  if (!activeStage) return null;

  // Local card opacity curve for smooth in/out transition
  const midpoint = (activeStage.min + activeStage.max) / 2;
  const halfSpan = (activeStage.max - activeStage.min) / 2;
  const distFromCenter = Math.abs(scrollProgress - midpoint);
  const cardOpacity = Math.max(0, 1 - Math.pow(distFromCenter / halfSpan, 2.5));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-between px-6 md:px-16">
      {/* Editorial Floating Info Card */}
      <div
        className={`pointer-events-auto transition-all duration-300 transform max-w-md w-full ${
          activeStage.side === 'right' ? 'ml-auto' : 'mr-auto'
        }`}
        style={{
          opacity: cardOpacity,
          transform: `translateY(${(1 - cardOpacity) * 24}px)`
        }}
      >
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle gold gradient accent edge */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-soma-bronze via-soma-accent to-transparent" />

          {/* Zone index & label */}
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-soma-bronze tracking-widest uppercase">
            <span>{activeStage.zone}</span>
            <span className="text-[10px] text-soma-sandMuted">REAL-TIME 3D VIEW</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-light text-soma-cream mb-1">
            {activeStage.title}
          </h3>
          <p className="font-sans text-xs tracking-wider uppercase text-soma-sandMuted mb-4">
            {activeStage.subtitle}
          </p>

          <p className="font-sans text-xs md:text-sm text-soma-sand/90 font-light leading-relaxed mb-5">
            {activeStage.description}
          </p>

          {/* Architectural Specs Grid */}
          <div className="grid grid-cols-3 gap-2 border-t border-b border-white/10 py-3 mb-5">
            {activeStage.specs.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-soma-sandMuted font-mono">
                  {item.label}
                </span>
                <span className="text-[11px] font-sans text-soma-cream font-medium truncate">
                  {item.val}
                </span>
              </div>
            ))}
          </div>

          {/* Action CTA & Material Inspection */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => onSelectMaterial(activeStage.action.materialId)}
              className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-soma-bronze hover:text-white transition-colors"
            >
              <span>{activeStage.action.label}</span>
              <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-[10px] font-mono text-soma-sandMuted/70">
              Scrub to traverse
            </span>
          </div>
        </div>
      </div>

      {/* Vertical Timeline Track on Right Edge */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center space-y-4 pointer-events-auto">
        <div className="text-[9px] font-mono tracking-widest text-soma-sandMuted rotate-90 mb-4 uppercase">
          Spatial Axis
        </div>
        <div className="w-[2px] h-32 bg-white/10 relative rounded-full overflow-hidden">
          <div
            className="w-full bg-soma-bronze transition-all duration-100"
            style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>
        <div className="flex flex-col space-y-2 text-[10px] font-mono text-soma-sandMuted pt-2">
          {stages.map((s) => (
            <span
              key={s.id}
              className={`transition-colors duration-300 ${
                activeStage.id === s.id ? 'text-soma-bronze font-bold scale-110' : 'text-soma-sandMuted/40'
              }`}
            >
              0{s.id}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
