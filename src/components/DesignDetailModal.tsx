import React, { useState } from 'react';
import { StoneDesign } from '../types/stone';
import { X, Layers, Cpu, Clock, Check, ShoppingBag, ShieldCheck, Ruler } from 'lucide-react';

interface DesignDetailModalProps {
  design: StoneDesign | null;
  onClose: () => void;
  onAddToCart: (design: StoneDesign, customOptions?: { dimensions: string; finish: string; customPrice: number }) => void;
}

export const DesignDetailModal: React.FC<DesignDetailModalProps> = ({
  design,
  onClose,
  onAddToCart
}) => {
  if (!design) return null;

  const [selectedFinish, setSelectedFinish] = useState('Diamond Mirror Polish');
  const [widthInches, setWidthInches] = useState(48);
  const [heightInches, setHeightInches] = useState(60);
  const [isWireframe, setIsWireframe] = useState(false);

  // Price scaling based on surface area
  const baseArea = 48 * 60; // 2880 sq inches
  const currentArea = widthInches * heightInches;
  const scaledPrice = Math.round(design.price * (currentArea / baseArea));

  const finishes = [
    { name: 'Diamond Mirror Polish', desc: 'Ultra-gloss reflective finish bringing out natural marble veins' },
    { name: 'Honed Matte Silk', desc: 'Silky smooth non-reflective contemporary modern architectural finish' },
    { name: 'Antique Acid Washed', desc: 'Rustic textured touch with enhanced carving depth shadows' },
    { name: 'Exterior Hydrophobic Sealed', desc: 'Deep penetrating sealer protecting against rain and UV' }
  ];

  const handleOrderCustomized = () => {
    onAddToCart(design, {
      dimensions: `${widthInches}" × ${heightInches}" × 3"`,
      finish: selectedFinish,
      customPrice: scaledPrice
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer border border-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Image with CAD simulation */}
          <div className="lg:col-span-6 relative bg-stone-950 min-h-[360px] lg:min-h-full flex flex-col justify-between overflow-hidden">
            <img
              src={design.imageUrl}
              alt={design.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${
                isWireframe ? 'filter invert contrast-200' : ''
              }`}
            />

            {isWireframe && (
              <div className="absolute inset-0 bg-blueprint-grid opacity-75 pointer-events-none" />
            )}

            {/* Overlay toggle */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-stone-950/90 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-sm">
                {design.stoneType}
              </span>
              <button
                type="button"
                onClick={() => setIsWireframe(!isWireframe)}
                className="px-2.5 py-1 rounded bg-stone-900/90 border border-stone-700 text-stone-300 text-[11px] font-tech hover:bg-stone-800 backdrop-blur-sm"
              >
                {isWireframe ? 'Show Natural Marble' : 'Show CAD Toolpath'}
              </button>
            </div>

            {/* Bottom info strip */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent">
              <div className="grid grid-cols-2 gap-2 text-xs font-tech text-stone-300">
                <div>
                  <span className="text-stone-400 block text-[10px]">CNC Tooling:</span>
                  <span className="text-amber-300 truncate block">{design.cutterBit}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Relief Depth:</span>
                  <span className="text-amber-300 block">{design.carvingDepth}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer & Specs */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                <span className="text-amber-500 uppercase tracking-wider font-semibold font-tech">
                  Job Spec #{design.id.toUpperCase()}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-tech">
                  <Clock className="w-3 h-3 text-stone-400" />
                  {design.machiningHours} hrs 5-Axis Milling
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-stone-100 mb-3">
                {design.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
                {design.description}
              </p>

              {/* Stone Characteristics */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 text-xs">
                <div className="flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block text-[10px]">Material</span>
                    <span className="text-stone-200 font-medium">{design.stoneType}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block text-[10px]">Milling Machine</span>
                    <span className="text-stone-200 font-medium">5-Axis Heavy Gantry</span>
                  </div>
                </div>
              </div>

              {/* Custom Dimensions Stepper */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-amber-400" />
                    Custom Slab Dimensions (Inches)
                  </label>
                  <span className="text-[11px] font-tech text-amber-400">
                    Area: {((widthInches * heightInches) / 144).toFixed(1)} Sq. Ft
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 block mb-1">Width: {widthInches}"</span>
                    <input
                      type="range"
                      min={24}
                      max={96}
                      step={6}
                      value={widthInches}
                      onChange={(e) => setWidthInches(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block mb-1">Height: {heightInches}"</span>
                    <input
                      type="range"
                      min={24}
                      max={120}
                      step={6}
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Stone Surface Finishes */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-stone-300 block mb-2">
                  Surface Texture & Hand Polish:
                </label>
                <div className="space-y-2">
                  {finishes.map((f) => (
                    <button
                      key={f.name}
                      type="button"
                      onClick={() => setSelectedFinish(f.name)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start justify-between cursor-pointer ${
                        selectedFinish === f.name
                          ? 'bg-amber-950/30 border-amber-500/80 text-amber-200'
                          : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-semibold block">{f.name}</span>
                        <span className="text-[11px] text-stone-400">{f.desc}</span>
                      </div>
                      {selectedFinish === f.name && (
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Craftsmanship Features list */}
              <div className="space-y-1.5 mb-6 text-xs text-stone-400">
                {design.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Total Est. Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-tech text-2xl font-bold text-amber-400 tabular-nums">
                    ${scaledPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-400">USD</span>
                </div>
              </div>

              <button
                onClick={handleOrderCustomized}
                className="px-6 py-3 rounded-lg text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Custom Piece to Bag</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
