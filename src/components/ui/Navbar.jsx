import React, { useState } from 'react';
import { Volume2, VolumeX, Sun, Moon, Sunrise, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../../utils/sound';

export default function Navbar({
  mood,
  setMood,
  onOpenConsultation,
  onNavigateSection
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const active = soundEngine.toggle();
    setIsPlayingAudio(active);
  };

  const navItems = [
    { label: 'Living', target: 0.1 },
    { label: 'Materials', target: 0.4 },
    { label: 'Dining', target: 0.65 },
    { label: 'Sanctuary', target: 0.95 },
    { label: 'Portfolio', target: 'portfolio' },
    { label: 'Atelier', target: 'atelier' }
  ];

  const handleNavClick = (target) => {
    onNavigateSection(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Identity */}
        <div
          onClick={() => handleNavClick(0)}
          className="cursor-pointer group flex flex-col"
        >
          <div className="flex items-center space-x-2">
            <span className="font-display text-xl md:text-2xl font-bold tracking-widest text-soma-cream group-hover:text-soma-bronze transition-colors">
              SOMA
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-soma-bronze" />
          </div>
          <span className="font-sans text-[9px] uppercase tracking-ultra text-soma-sandMuted -mt-1 group-hover:text-soma-sand transition-colors">
            Interiors Studio
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 glass-panel px-6 py-2.5 rounded-full">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.target)}
              className="text-xs uppercase tracking-widest text-soma-sand/80 hover:text-soma-cream transition-colors font-sans hover:scale-105 transform duration-150"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Controls: Mood Selector + Audio Toggle + Consultation CTA */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Atmosphere Lighting Mood Selector */}
          <div className="hidden sm:flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1">
            <button
              onClick={() => setMood('morning')}
              title="Morning Mist (5500K)"
              className={`p-1.5 rounded-full transition-all ${
                mood === 'morning'
                  ? 'bg-soma-bronze text-black font-semibold shadow-md'
                  : 'text-soma-sandMuted hover:text-soma-cream'
              }`}
            >
              <Sunrise className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMood('golden')}
              title="Golden Hour (3200K)"
              className={`p-1.5 rounded-full transition-all ${
                mood === 'golden'
                  ? 'bg-soma-bronze text-black font-semibold shadow-md'
                  : 'text-soma-sandMuted hover:text-soma-cream'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMood('twilight')}
              title="Twilight Noir (2700K)"
              className={`p-1.5 rounded-full transition-all ${
                mood === 'twilight'
                  ? 'bg-soma-bronze text-black font-semibold shadow-md'
                  : 'text-soma-sandMuted hover:text-soma-cream'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Ambient Soundscape Engine Toggle */}
          <button
            onClick={toggleSound}
            title={isPlayingAudio ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
            className="flex items-center space-x-2 px-3 py-2 rounded-full glass-pill hover:border-soma-bronze/50 transition-all text-xs text-soma-sand"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-soma-bronze animate-pulse" />
                <span className="hidden md:inline text-[10px] tracking-widest uppercase text-soma-bronze">
                  Sound On
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-soma-sandMuted" />
                <span className="hidden md:inline text-[10px] tracking-widest uppercase text-soma-sandMuted">
                  Sound
                </span>
              </>
            )}
          </button>

          {/* Book Consultation Button */}
          <button
            onClick={onOpenConsultation}
            className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-full bg-soma-sand text-black hover:bg-soma-bronze hover:text-black transition-all text-xs font-medium tracking-wider uppercase font-sans shadow-lg group"
          >
            <span>Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-pill text-soma-cream"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-6 glass-panel rounded-2xl border border-white/10 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
                className="text-left text-sm uppercase tracking-widest text-soma-sand hover:text-soma-bronze transition-colors py-1"
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-white/10 pt-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between text-xs text-soma-sandMuted">
                <span>Lighting Atmosphere:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setMood('morning')}
                    className={`px-2 py-1 rounded text-xs ${mood === 'morning' ? 'bg-soma-bronze text-black' : 'text-soma-sand'}`}
                  >
                    Morning
                  </button>
                  <button
                    onClick={() => setMood('golden')}
                    className={`px-2 py-1 rounded text-xs ${mood === 'golden' ? 'bg-soma-bronze text-black' : 'text-soma-sand'}`}
                  >
                    Golden
                  </button>
                  <button
                    onClick={() => setMood('twilight')}
                    className={`px-2 py-1 rounded text-xs ${mood === 'twilight' ? 'bg-soma-bronze text-black' : 'text-soma-sand'}`}
                  >
                    Twilight
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-2.5 rounded-full bg-soma-sand text-black text-center font-medium text-xs uppercase tracking-widest"
              >
                Book Design Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
