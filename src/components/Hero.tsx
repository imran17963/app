import React from 'react';
import { RasLogo } from './RasLogo';
import { HERO_IMAGE, TOOLS_WORKSHOP_IMAGE, INITIAL_SITE_CONTENT } from '../data/initialData';
import { Compass, Sparkles, ArrowRight, Layers, Sliders, ShieldCheck } from 'lucide-react';
import { SiteContent } from '../types/stone';

interface HeroProps {
  onExploreCatalog: () => void;
  onTrackOrder: () => void;
  onRequestQuote: () => void;
  siteContent?: SiteContent;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onTrackOrder,
  onRequestQuote,
  siteContent = INITIAL_SITE_CONTENT
}) => {
  return (
    <section className="relative w-full overflow-hidden border-b border-stone-800 bg-stone-950">
      {/* Background CNC Machine Imagery with Atmospheric Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="5-Axis CNC Heavy Duty Stone Router Carving Carrara Marble Relief"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.15]"
          referrerPolicy="no-referrer"
        />
        {/* Deep Industrial & Blueprint Grid Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/70" />
        <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Hero Typography & Mission */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Architectural Discipline Subtitle */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-stone-900/90 border border-amber-500/30 text-amber-300 text-xs font-medium mb-6 backdrop-blur-sm">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span className="tracking-wide">{siteContent.heroKicker}</span>
            </div>

            {/* Stylized Brand Logo & Headline */}
            <div className="mb-4">
              <RasLogo
                variant="full"
                size="xl"
                customTitle={siteContent.brandTitle}
                customSubtitle={siteContent.brandSubtitle}
              />
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-100 tracking-tight leading-[1.15] mb-6 max-w-2xl text-balance">
              {siteContent.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-8 max-w-xl font-normal">
              {siteContent.heroDescription}
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 text-sm font-semibold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-lg shadow-amber-950/50 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Browse Stone Designs</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                onClick={onTrackOrder}
                className="px-5 py-3.5 text-sm font-semibold text-stone-200 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-400/50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Track Your CNC Order</span>
              </button>

              <button
                onClick={onRequestQuote}
                className="px-4 py-3.5 text-sm font-medium text-amber-300 hover:text-amber-200 hover:underline transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Custom CAD Quote</span>
              </button>
            </div>

            {/* CNC Machine Spec Ribbon */}
            <div className="mt-10 pt-6 border-t border-stone-800/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="block text-stone-400 font-sans">Precision Tolerance</span>
                <span className="text-stone-100 font-semibold font-tech text-sm">± 0.02 mm</span>
              </div>
              <div>
                <span className="block text-stone-400 font-sans">Spindle Speed</span>
                <span className="text-amber-400 font-semibold font-tech text-sm">24,000 RPM</span>
              </div>
              <div>
                <span className="block text-stone-400 font-sans">Max Slab Envelope</span>
                <span className="text-stone-100 font-semibold font-tech text-sm">3.2m × 2.0m</span>
              </div>
              <div>
                <span className="block text-stone-400 font-sans">Diamond PCD Bits</span>
                <span className="text-amber-400 font-semibold font-tech text-sm">Italian Electroplated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Workshop Tools & CNC Live Machining Status Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-stone-900/80 shadow-2xl backdrop-blur-md">
              {/* CNC Tools Preview Image Header */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={TOOLS_WORKSHOP_IMAGE}
                  alt="Diamond CNC Stone Cutting Bits and Chisels in Workshop"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-stone-950/80 border border-amber-500/40 rounded text-[11px] font-tech text-amber-400 backdrop-blur-sm">
                  TOOL RACK #04 • ACTIVE
                </div>
              </div>

              {/* Machining Status Details */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-stone-100">
                      R.A.S High-Precision Workshop
                    </h3>
                    <p className="text-xs text-stone-400">
                      Waterjet Cutting · 3D Roughing · Diamond Hand Finishing
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-950 border border-amber-500/30 text-amber-400 text-xs font-tech">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    LIVE SPINDLE
                  </span>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-stone-800 text-xs text-stone-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-stone-400">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      Stone Stock Material
                    </span>
                    <span className="font-semibold text-stone-200">Carrara, Makrana, Nero Marquina</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-stone-400">
                      <Sliders className="w-3.5 h-3.5 text-amber-500" />
                      Current CNC Program
                    </span>
                    <span className="font-tech text-amber-300">G-Code: #RAS_3D_RELIEF_V4</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-stone-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                      Delivery Packaging
                    </span>
                    <span className="text-stone-200">Wooden Armor Suspension Crates</span>
                  </div>
                </div>

                {/* Spindle Progress Bar */}
                <div className="mt-4 pt-3 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-stone-400">Spindle Feed Rate (850 mm/min)</span>
                    <span className="font-tech text-amber-400">XYZ Active Coordinates</span>
                  </div>
                  <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 h-full w-[72%] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantee Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300">
                <span className="font-semibold text-amber-400 block mb-0.5">Admin Design Studio</span>
                <span>Upload custom DXF, STL & photo designs anytime</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300">
                <span className="font-semibold text-amber-400 block mb-0.5">Live Order Tracking</span>
                <span>Real-time CNC carving milestones & dispatch</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
