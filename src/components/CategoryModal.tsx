import React, { useState } from 'react';
import { Category } from '../types/stone';
import { X, Layers, Plus, Check } from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCategory: (category: Category) => void;
  existingCategory?: Category | null;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSaveCategory,
  existingCategory
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(existingCategory?.name || '');
  const [description, setDescription] = useState(existingCategory?.description || '');
  const [stoneMaterial, setStoneMaterial] = useState(existingCategory?.stoneMaterial || 'Italian Carrara Marble');
  const [imageUrl, setImageUrl] = useState(existingCategory?.imageUrl || '');

  const samplePresets = [
    { name: '3D Bas-Relief Panels', mat: 'Italian Carrara Marble & White Onyx' },
    { name: 'Architectural Jaali & Grills', mat: 'Jodhpur Teak & Sandstone' },
    { name: 'Waterjet Floor Inlays', mat: 'Nero Marquina & Greek Statuario' },
    { name: 'Carved Columns & Pillars', mat: 'Makrana Pure White Marble' },
    { name: 'CNC Engraved Plaques & Crests', mat: 'Jet Black Granite' },
    { name: 'Marble Mandir & Temple Shrines', mat: 'Pure Ambaji & Makrana Marble' },
    { name: 'Fireplace Mantels & Hearth Carvings', mat: 'Beige Travertine & Limestone' },
    { name: 'Acoustic Stone Cladding & Facades', mat: 'Honed Basalt & Granites' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCategory: Category = {
      id: existingCategory?.id || `cat-${Date.now()}`,
      name: name.trim(),
      slug,
      description: description.trim() || 'Precision CNC engineered natural stone carvings.',
      stoneMaterial: stoneMaterial.trim() || 'Natural Marble & Granite',
      imageUrl: imageUrl.trim() || undefined
    };

    onSaveCategory(newCategory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden p-6 sm:p-7">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-stone-100">
                {existingCategory ? 'Edit Stone Category' : 'Add New Stone Category'}
              </h3>
              <p className="text-xs text-stone-400">
                Organize CNC carving types & stone material collections
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 mb-2">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-1.5">
            Quick Architecture Presets:
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {samplePresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  setName(preset.name);
                  setStoneMaterial(preset.mat);
                }}
                className="px-2 py-1 text-[11px] rounded bg-stone-950 border border-stone-800 hover:border-amber-500 text-stone-300 hover:text-amber-300 transition-colors cursor-pointer"
              >
                + {preset.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Luxury 3D Marble Wall Cladding"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Primary Stone Material
            </label>
            <input
              type="text"
              placeholder="e.g., Carrara White Marble, Nero Marquina"
              value={stoneMaterial}
              onChange={(e) => setStoneMaterial(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Explain the architectural application and CNC carving technique..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Cover Image URL (Optional)
            </label>
            <input
              type="text"
              placeholder="https://... or /src/assets/images/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-tech"
            />
          </div>

          <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{existingCategory ? 'Save Changes' : 'Create Category'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
