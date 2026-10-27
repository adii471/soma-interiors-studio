import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/projectsData';
import { ArrowUpRight, Sparkles, Filter, MapPin, Maximize2, X, Compass } from 'lucide-react';

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Residential', 'Hospitality', 'Penthouse'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative z-20 bg-[#0E0D0C] py-32 px-6 md:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-soma-bronze mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Works & Spatial Studies</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-soma-cream">
              Architectural Portfolio
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? 'bg-soma-sand text-black font-semibold shadow-md'
                    : 'glass-pill text-soma-sandMuted hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Notice Banner */}
        <div className="mb-12 p-4 rounded-xl glass-panel border border-soma-bronze/20 flex items-center justify-between text-xs text-soma-sandMuted">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-soma-bronze animate-pulse" />
            <span className="font-mono text-soma-sand">
              ATELIER ARCHIVE: The following residences are identified as SOMA studio concept designs.
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[10px] uppercase text-soma-bronze">
            Concept Studies 2024–2026
          </span>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer flex flex-col space-y-5"
            >
              {/* Image Container with subtle zoom & Concept Badge */}
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-neutral-900 border border-white/5">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                  loading="lazy"
                />

                {/* Concept Design Watermark Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-soma-bronze border border-soma-bronze/30">
                    Concept Design
                  </span>
                </div>

                {/* Quick inspect overlay button */}
                <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5 text-soma-cream" />
                </div>
              </div>

              {/* Editorial Typography & Metadata */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-soma-sandMuted">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-soma-bronze" />
                    <span>{project.location}</span>
                  </span>
                  <span>{project.area} · {project.year}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-soma-cream group-hover:text-soma-bronze transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <span className="text-xs font-mono font-normal text-soma-sandMuted group-hover:text-soma-sand">
                    {project.subtitle}
                  </span>
                </h3>

                <p className="font-sans text-xs sm:text-sm text-soma-sandMuted line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Material Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-soma-sand/70 px-2.5 py-1 rounded glass-pill"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal / Drawer */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#131211] border border-white/10 rounded-3xl p-6 sm:p-10 text-soma-sand relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full glass-pill hover:bg-white/10 text-soma-sand hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-soma-bronze/10 text-soma-bronze border border-soma-bronze/30 mb-3">
                Concept Architectural Design · {selectedProject.category}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-soma-cream mb-2">
                {selectedProject.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm font-mono text-soma-sandMuted uppercase tracking-wider">
                {selectedProject.subtitle} — {selectedProject.location} ({selectedProject.year})
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/10">
              <img
                src={selectedProject.heroImage}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quote */}
            <blockquote className="font-serif italic text-lg sm:text-xl text-soma-cream/90 border-l-2 border-soma-bronze pl-6 py-2 mb-8">
              "{selectedProject.quote}"
            </blockquote>

            {/* Full Architectural Narrative */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-8 mb-8">
              <div className="md:col-span-2">
                <h4 className="font-serif text-xl font-light text-soma-cream mb-3">
                  Spatial Narrative
                </h4>
                <p className="font-sans text-sm text-soma-sand/90 font-light leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-light text-soma-cream mb-3">
                  Primary Materiality
                </h4>
                <ul className="space-y-2">
                  {selectedProject.materials.map((mat, i) => (
                    <li key={i} className="text-xs font-mono text-soma-sand flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-soma-bronze" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Close CTA */}
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-full bg-soma-sand text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-soma-bronze transition-colors"
              >
                Close Project Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
