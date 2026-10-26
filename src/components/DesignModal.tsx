import React, { useState, useRef } from 'react';
import { Category, StoneDesign } from '../types/stone';
import { X, Upload, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

interface DesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDesign: (design: StoneDesign) => void;
  categories: Category[];
  existingDesign?: StoneDesign | null;
}

export const DesignModal: React.FC<DesignModalProps> = ({
  isOpen,
  onClose,
  onSaveDesign,
  categories,
  existingDesign
}) => {
  if (!isOpen) return null;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const presetImages = [
    { label: '3D Marble Relief', url: '/src/assets/images/stone_design_3d_relief_1792994105139.jpg' },
    { label: 'Sandstone Jaali Screen', url: '/src/assets/images/stone_design_jaali_screen_1792994104562.jpg' },
    { label: 'Waterjet Floor Medallion', url: '/src/assets/images/stone_design_floor_inlay_1792994183891.jpg' },
    { label: 'Carved Marble Column', url: '/src/assets/images/stone_design_marble_pillar_1792994182615.jpg' },
    { label: 'CNC Tools & Black Granite', url: '/src/assets/images/cnc_tools_cutters_workshop_1792994104382.jpg' },
    { label: '5-Axis CNC Milling Spindle', url: '/src/assets/images/hero_cnc_stone_machine_1792994103209.jpg' }
  ];

  const [title, setTitle] = useState(existingDesign?.title || '');
  const [categoryId, setCategoryId] = useState(existingDesign?.category || categories[0]?.id || '');
  const [imageUrl, setImageUrl] = useState(existingDesign?.imageUrl || presetImages[0].url);
  const [stoneType, setStoneType] = useState(existingDesign?.stoneType || 'Carrara White Marble');
  const [dimensions, setDimensions] = useState(existingDesign?.dimensions || '48" x 60" x 3"');
  const [carvingDepth, setCarvingDepth] = useState(existingDesign?.carvingDepth || '25mm 3D High-Relief');
  const [cutterBit, setCutterBit] = useState(existingDesign?.cutterBit || '6mm Diamond Ball-Nose PCD');
  const [machiningHours, setMachiningHours] = useState(existingDesign?.machiningHours || 16);
  const [price, setPrice] = useState(existingDesign?.price || 1200);
  const [unit, setUnit] = useState(existingDesign?.unit || 'per carved slab');
  const [description, setDescription] = useState(
    existingDesign?.description || 'Custom architectural stone panel precision machined on 5-axis CNC router with diamond tooling.'
  );
  const [featuresStr, setFeaturesStr] = useState(
    existingDesign?.features?.join('\n') || 'Solid natural quarried slab\nHigh precision diamond toolpath\nPre-drilled mounting brackets\nMirror hand buffing'
  );

  // File upload handler to Base64 so user can upload any image from local computer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const featuresList = featuresStr
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedDesign: StoneDesign = {
      id: existingDesign?.id || `des-${Date.now()}`,
      title: title.trim(),
      category: categoryId,
      imageUrl: imageUrl.trim() || presetImages[0].url,
      stoneType,
      dimensions: dimensions.trim(),
      carvingDepth: carvingDepth.trim(),
      cutterBit: cutterBit.trim(),
      machiningHours: Number(machiningHours) || 12,
      price: Number(price) || 500,
      unit: unit.trim(),
      description: description.trim(),
      features: featuresList.length > 0 ? featuresList : ['Precision CNC Carved', 'Hand Polished'],
      inStock: true,
      isCustomizable: true,
      featured: existingDesign?.featured || false,
      createdAt: existingDesign?.createdAt || new Date().toISOString().split('T')[0]
    };

    onSaveDesign(updatedDesign);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden p-6 sm:p-8 my-8 max-h-[90vh] flex flex-col justify-between">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <span className="text-[11px] font-tech text-amber-500 font-semibold uppercase tracking-wider block">
              R.A.S Admin Design Management
            </span>
            <h3 className="font-display text-xl font-bold text-stone-100">
              {existingDesign ? 'Update Stone Design & Photo' : 'Add New Stone Design to Studio'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto pr-2 space-y-5 my-4">
          
          {/* Photo Upload & Preview Section */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800">
            <label className="text-xs font-semibold text-stone-200 block mb-2">
              Design Photo / Image *
            </label>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Photo Thumbnail */}
              <div className="relative w-36 h-28 rounded-lg overflow-hidden border border-stone-700 bg-stone-900 shrink-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Design Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-500">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image from Device</span>
                  </button>
                </div>

                <div>
                  <span className="text-[11px] text-stone-400 block mb-1">Or paste Direct Image URL:</span>
                  <input
                    type="text"
                    placeholder="https://... or /src/assets/images/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500 font-tech"
                  />
                </div>

                {/* Quick Workshop Library Presets */}
                <div>
                  <span className="text-[10px] text-stone-400 block mb-1">Preset Workshop Gallery:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {presetImages.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setImageUrl(p.url)}
                        className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                          imageUrl === p.url
                            ? 'bg-amber-400 text-stone-950 font-bold border-amber-400'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Design Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., Royal Florentine 3D Marble Panel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Category *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Technical Stone & CNC Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Stone Material</label>
              <input
                type="text"
                placeholder="e.g., Carrara White Marble"
                value={stoneType}
                onChange={(e) => setStoneType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Standard Dimensions</label>
              <input
                type="text"
                placeholder='e.g., 48" x 60" x 3"'
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-tech"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Carving Depth</label>
              <input
                type="text"
                placeholder="e.g., 28mm 3D Bas-Relief"
                value={carvingDepth}
                onChange={(e) => setCarvingDepth(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-tech"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">CNC Cutter Bit Spec</label>
              <input
                type="text"
                placeholder="e.g., 4mm Diamond Ball-Nose PCD"
                value={cutterBit}
                onChange={(e) => setCutterBit(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-tech"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Machining Time (Hours)</label>
              <input
                type="number"
                min={1}
                value={machiningHours}
                onChange={(e) => setMachiningHours(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-tech"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Price ($ USD)</label>
              <input
                type="number"
                min={1}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-tech"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">Design Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Key Features (One per line)
            </label>
            <textarea
              rows={3}
              value={featuresStr}
              onChange={(e) => setFeaturesStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-mono text-[11px]"
            />
          </div>

        </form>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <span className="text-[11px] text-stone-400 font-tech">
            Real-time update directly saved to studio catalog
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{existingDesign ? 'Update Design & Photos' : 'Publish New Stone Design'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
