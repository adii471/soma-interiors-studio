import React from 'react';
import { X, Layers, Compass, Sparkles, CheckCircle2, FileCode } from 'lucide-react';
import { MATERIAL_SPECS } from '../../data/projectsData';

export default function MaterialDrawer({ materialId, onClose }) {
  if (!materialId) return null;

  const material = MATERIAL_SPECS.find((m) => m.id === materialId) || MATERIAL_SPECS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#131211] border border-white/10 rounded-2xl p-6 sm:p-8 text-soma-sand shadow-2xl relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full glass-pill hover:bg-white/10 text-soma-sand hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-pill border border-soma-bronze/30 text-soma-bronze text-xs font-mono tracking-widest uppercase mb-4">
          <Layers className="w-3 h-3" />
          <span>Material Specification</span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-3xl font-light text-soma-cream mb-2">
          {material.name}
        </h2>
        <div className="text-xs font-mono text-soma-sandMuted uppercase tracking-wider mb-6">
          Origin: {material.origin} · Finish: {material.finish}
        </div>

        {/* Color / Texture Swatch Preview */}
        <div
          className="w-full h-32 rounded-xl mb-6 flex items-end p-4 border border-white/10 shadow-inner"
          style={{ backgroundColor: material.palette }}
        >
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded text-[11px] font-mono text-white">
            Hex Swatch: {material.palette}
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-soma-sand/90 font-light leading-relaxed mb-6">
          {material.description}
        </p>

        {/* Specification Metrics */}
        <div className="space-y-3 border-t border-white/10 pt-4 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-soma-sandMuted font-mono">Sustainability</span>
            <span className="text-soma-cream font-medium">FSC / Carbon Neutral Quarry</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-soma-sandMuted font-mono">Reflectance Value</span>
            <span className="text-soma-cream font-medium">LRV 42% Matte Diffuse</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-soma-sandMuted font-mono">Acoustic Rating</span>
            <span className="text-soma-cream font-medium">NRC 0.65 Absorption</span>
          </div>
        </div>

        {/* Architectural 3D Asset Replacement Note */}
        <div className="p-4 rounded-xl bg-black/40 border border-soma-bronze/20 text-xs">
          <div className="flex items-center space-x-2 text-soma-bronze font-mono uppercase text-[11px] mb-1">
            <FileCode className="w-3.5 h-3.5" />
            <span>GLB Model Customization Slot</span>
          </div>
          <p className="text-soma-sandMuted text-[11px] leading-relaxed">
            This interior scene runs procedurally for zero-latency loading. To substitute with a custom photorealistic 3D interior model:
          </p>
          <code className="block mt-2 p-2 rounded bg-black/60 font-mono text-[10px] text-soma-accent select-all">
            public/models/interior.glb
          </code>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-soma-sand text-black font-medium text-xs uppercase tracking-widest hover:bg-soma-bronze transition-colors"
        >
          Return to Spatial Tour
        </button>
      </div>
    </div>
  );
}
