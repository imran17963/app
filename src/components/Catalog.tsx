import React, { useState, useMemo } from 'react';
import { Category, StoneDesign } from '../types/stone';
import { Search, Plus, Eye, ShoppingBag, SlidersHorizontal, Sparkles } from 'lucide-react';

interface CatalogProps {
  designs: StoneDesign[];
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  onOpenDesignDetail: (design: StoneDesign) => void;
  onAddToCart: (design: StoneDesign) => void;
  onOpenAddCategoryModal: () => void;
  onOpenAddDesignModal: () => void;
  isAdmin: boolean;
}

export const Catalog: React.FC<CatalogProps> = ({
  designs,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onOpenDesignDetail,
  onAddToCart,
  onOpenAddCategoryModal,
  onOpenAddDesignModal,
  isAdmin
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoneType, setSelectedStoneType] = useState<string>('all');
  const [viewWireframe, setViewWireframe] = useState<Record<string, boolean>>({});

  const stoneTypes = useMemo(() => {
    const types = new Set<string>();
    designs.forEach((d) => types.add(d.stoneType));
    return Array.from(types);
  }, [designs]);

  const filteredDesigns = useMemo(() => {
    return designs.filter((design) => {
      const matchesCategory = selectedCategoryId ? design.category === selectedCategoryId : true;
      const matchesSearch =
        design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.stoneType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStoneType = selectedStoneType === 'all' || design.stoneType === selectedStoneType;
      return matchesCategory && matchesSearch && matchesStoneType;
    });
  }, [designs, selectedCategoryId, searchQuery, selectedStoneType]);

  const toggleWireframe = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewWireframe((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="catalog-section" className="py-14 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500 block mb-2">
            Architectural Portfolio
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-100">
            Precision CNC Stone Designs & Sculptures
          </h2>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            Explore handcrafted 3D bas-relief carvings, geometric jaali partitions, and waterjet medallion inlays.
          </p>
        </div>

        {/* Action Buttons for Admin or Custom Requests */}
        <div className="flex flex-wrap items-center gap-3">
          {isAdmin && (
            <button
              onClick={onOpenAddDesignModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Design</span>
            </button>
          )}

          {isAdmin && (
            <button
              onClick={onOpenAddCategoryModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-200 bg-stone-900 border border-amber-500/40 hover:border-amber-400 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>+ Add Category</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Filter Bar */}
      <div className="mb-8 space-y-4">
        {/* Category Horizontal Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategoryId === null
                ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            All Designs ({designs.length})
          </button>

          {categories.map((cat) => {
            const count = designs.filter((d) => d.category === cat.id).length;
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] font-tech px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Material Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by design name, stone type, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400 flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Stone Type:
            </span>
            <select
              value={selectedStoneType}
              onChange={(e) => setSelectedStoneType(e.target.value)}
              className="bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Natural Stones</option>
              {stoneTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Designs */}
      {filteredDesigns.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-stone-900/40 border border-stone-800/80 p-8">
          <div className="w-12 h-12 rounded-full bg-stone-800/80 mx-auto flex items-center justify-center text-stone-400 mb-3">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-display text-lg font-bold text-stone-200 mb-1">No stone designs match your filter</h3>
          <p className="text-xs text-stone-400 max-w-md mx-auto mb-5">
            Try adjusting your search query or reset category selection to view all available architectural carvings.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStoneType('all');
              onSelectCategory(null);
            }}
            className="px-4 py-2 text-xs font-semibold text-amber-400 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDesigns.map((design) => {
            const isWireframe = viewWireframe[design.id];
            const categoryObj = categories.find((c) => c.id === design.category);

            return (
              <div
                key={design.id}
                onClick={() => onOpenDesignDetail(design)}
                className="group relative rounded-xl overflow-hidden bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-950/20 flex flex-col cursor-pointer"
              >
                {/* Image Container with CNC Depth & Wireframe Overlays */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                  <img
                    src={design.imageUrl}
                    alt={design.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      isWireframe ? 'filter invert contrast-200 brightness-90' : ''
                    }`}
                  />

                  {/* Wireframe CAD toolpath simulation layer */}
                  {isWireframe && (
                    <div className="absolute inset-0 bg-blueprint-grid opacity-70 pointer-events-none" />
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded bg-stone-950/85 border border-stone-700 text-stone-200 text-[11px] font-medium backdrop-blur-sm">
                      {design.stoneType}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleWireframe(design.id, e)}
                      className="pointer-events-auto px-2 py-1 rounded bg-stone-950/85 border border-amber-500/40 text-[10px] font-tech text-amber-300 hover:bg-amber-500 hover:text-stone-950 transition-colors backdrop-blur-sm"
                      title="Toggle CNC Toolpath Mesh"
                    >
                      {isWireframe ? 'Photo View' : 'CAD Toolpath'}
                    </button>
                  </div>

                  {/* Bottom Image Gradient Scrim with Dimensions */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent flex items-center justify-between text-[11px] text-stone-300 font-tech">
                    <span>Dim: {design.dimensions}</span>
                    <span className="text-amber-400">Depth: {design.carvingDepth}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet Metadata */}
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5">
                      <span className="uppercase tracking-wider font-semibold text-amber-500/90 text-[11px]">
                        {categoryObj?.name || 'Architectural Stone'}
                      </span>
                      <span>·</span>
                      <span className="font-tech text-[11px]">{design.machiningHours}h CNC Machined</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
                      {design.title}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-4">
                      {design.description}
                    </p>

                    {/* Technical CNC specs tags */}
                    <div className="pt-3 border-t border-stone-800/80 space-y-1.5 text-[11px] text-stone-300 font-tech">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Diamond Cutter Bit:</span>
                        <span className="text-stone-200 truncate max-w-[180px]">{design.cutterBit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-400">Custom Dimensions:</span>
                        <span className="text-amber-400">Available on request</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer with Price and Actions */}
                  <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-stone-400">Stone Price</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-tech text-xl font-bold text-stone-100 tabular-nums">
                          ${design.price.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-stone-400">/ {design.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDesignDetail(design);
                        }}
                        className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                        title="View Detailed Specs"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(design);
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-colors cursor-pointer shadow-sm active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Custom Stonework Architectural Banner */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900/90 to-stone-950 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-1">
            Bespoke Architectural Engineering
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-100">
            Have Your Own 3D CAD (.STL / .DXF) or Reference Image?
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
            Our 5-axis CNC programming team can scale, carve, and polish any custom artwork onto white marble, black granite, or natural sandstone.
          </p>
        </div>

        <button
          onClick={onOpenAddDesignModal}
          className="px-5 py-3 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Upload Custom Design Reference</span>
        </button>
      </div>
    </section>
  );
};
