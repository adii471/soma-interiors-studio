import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, Shield } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    scope: 'Full Residence Architecture',
    budget: '$500,000 – $1,000,000',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-fadeIn"
      onClick={resetAndClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#141312] border border-white/10 rounded-3xl p-6 sm:p-10 text-soma-sand shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 p-2 rounded-full glass-pill hover:bg-white/10 text-soma-sand hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-soma-bronze/20 border border-soma-bronze text-soma-bronze flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl font-light text-soma-cream mb-2">
              Inquiry Received
            </h3>
            <p className="font-sans text-sm text-soma-sandMuted max-w-md mx-auto leading-relaxed mb-8">
              Thank you, {formData.name || 'valued client'}. The partners at SOMA will review your architectural brief and contact you within two business days to schedule an initial spatial dialogue.
            </p>
            <button
              onClick={resetAndClose}
              className="px-8 py-3 rounded-full bg-soma-sand text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-soma-bronze transition-colors"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-soma-bronze mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private Commissions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-soma-cream mb-2">
              Request Architectural Consultation
            </h2>
            <p className="font-sans text-xs sm:text-sm text-soma-sandMuted mb-6 leading-relaxed">
              We accept a limited number of residential and hospitality commissions each year to ensure uncompromising craftsmanship.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-soma-sandMuted mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-soma-cream placeholder-soma-sandMuted/40 focus:border-soma-bronze focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-soma-sandMuted mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-soma-cream placeholder-soma-sandMuted/40 focus:border-soma-bronze focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-soma-sandMuted mb-1">
                    Project Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Zurich / Tribeca, NY"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-soma-cream placeholder-soma-sandMuted/40 focus:border-soma-bronze focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-soma-sandMuted mb-1">
                    Project Scope
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full bg-[#1e1c1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-soma-cream focus:border-soma-bronze focus:outline-none transition-colors"
                  >
                    <option>Full Residence Architecture</option>
                    <option>Penthouse / Duplex Renovation</option>
                    <option>Bespoke Hospitality / Boutique</option>
                    <option>Sculptural Interior & Millwork</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-soma-sandMuted mb-1">
                  Anticipated Investment Tier
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-[#1e1c1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-soma-cream focus:border-soma-bronze focus:outline-none transition-colors"
                >
                  <option>$250,000 – $500,000</option>
                  <option>$500,000 – $1,000,000</option>
                  <option>$1,000,000 – $2,500,000</option>
                  <option>$2,500,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-soma-sandMuted mb-1">
                  Project Notes & Timeline
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the property, architectural vision, or desired materials..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-soma-cream placeholder-soma-sandMuted/40 focus:border-soma-bronze focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-soma-sand text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-soma-bronze transition-colors flex items-center justify-center space-x-2 shadow-xl"
                >
                  <span>Transmit Commission Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-soma-sandMuted/70 pt-2">
                <Shield className="w-3 h-3 text-soma-bronze" />
                <span>All project communications are held in strict non-disclosure.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
