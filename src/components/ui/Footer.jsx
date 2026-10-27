import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onScrollToTop }) {
  return (
    <footer className="relative z-20 bg-[#090807] border-t border-white/10 text-soma-sand pt-24 pb-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-white/10 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-display text-2xl md:text-3xl font-bold tracking-widest text-soma-cream">
                SOMA
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-soma-bronze" />
            </div>
            <span className="font-sans text-xs uppercase tracking-ultra text-soma-sandMuted block mb-4">
              Interiors Studio · Architectural Atelier
            </span>
            <p className="font-serif italic text-lg text-soma-sand/80 max-w-sm">
              "Spaces that feel like home. Designed to stay timeless."
            </p>
          </div>

          <button
            onClick={onScrollToTop}
            className="group flex items-center space-x-3 px-5 py-3 rounded-full glass-panel hover:border-soma-bronze/50 self-start md:self-auto transition-all"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-soma-sand group-hover:text-soma-bronze transition-colors">
              Return to Top 3D View
            </span>
            <ArrowUp className="w-4 h-4 text-soma-bronze group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Middle Row: Global Atelier Locations & Inquiries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-soma-bronze block mb-4">
              MILAN ATELIER
            </span>
            <p className="text-xs font-sans text-soma-sandMuted leading-relaxed">
              Via della Spiga, 14<br />
              20121 Milano, Italy<br />
              <span className="text-soma-sand">+39 02 8945 2200</span>
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-soma-bronze block mb-4">
              NEW YORK STUDIO
            </span>
            <p className="text-xs font-sans text-soma-sandMuted leading-relaxed">
              520 West 28th St, Chelsea<br />
              New York, NY 10001<br />
              <span className="text-soma-sand">+1 (212) 890-4100</span>
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-soma-bronze block mb-4">
              TOKYO OFFICE
            </span>
            <p className="text-xs font-sans text-soma-sandMuted leading-relaxed">
              Minami-Aoyama 5-Chome<br />
              Minato-ku, Tokyo 107-0062<br />
              <span className="text-soma-sand">+81 3 6427 8890</span>
            </p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-soma-bronze block mb-4">
              COMMISSIONS & PRESS
            </span>
            <p className="text-xs font-sans text-soma-sandMuted leading-relaxed mb-3">
              Direct all architectural inquiries and monograph requests to:
            </p>
            <a
              href="mailto:atelier@soma-interiors.com"
              className="text-xs font-mono text-soma-cream hover:text-soma-bronze transition-colors underline underline-offset-4"
            >
              atelier@soma-interiors.com
            </a>
          </div>
        </div>

        {/* Bottom Row: Legal & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] font-mono text-soma-sandMuted/60 gap-4">
          <div>
            © {new Date().getFullYear()} SOMA INTERIORS STUDIO. All architectural rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-soma-sand cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-soma-sand cursor-pointer transition-colors">Acoustic Specifications</span>
            <span className="hover:text-soma-sand cursor-pointer transition-colors">Client NDA Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
