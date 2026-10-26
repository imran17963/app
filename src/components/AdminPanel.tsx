import React, { useState } from 'react';
import { Category, Order, OrderStage, SiteContent, StoneDesign } from '../types/stone';
import { 
  Plus, Edit, Trash2, Layers, Cpu, Package, CheckCircle2, 
  Clock, Truck, Sliders, ShieldCheck, Search, Eye, KeyRound, 
  Lock, AlertTriangle, Check, RefreshCw, Type, Save, Phone, MapPin, Smartphone
} from 'lucide-react';

interface AdminPanelProps {
  designs: StoneDesign[];
  categories: Category[];
  orders: Order[];
  onAddNewDesign: () => void;
  onEditDesign: (design: StoneDesign) => void;
  onDeleteDesign: (id: string) => void;
  onAddNewCategory: () => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStage, tracking?: string, notes?: string) => void;
  onViewDesign: (design: StoneDesign) => void;
  isAdmin: boolean;
  adminEmail: string;
  adminPassword: string;
  currentEmail: string | null;
  onChangeAdminEmail: (newEmail: string) => void;
  onChangeAdminPassword: (newPass: string) => void;
  siteContent: SiteContent;
  onUpdateSiteContent: (content: SiteContent) => void;
  onOpenAuth: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  designs,
  categories,
  orders,
  onAddNewDesign,
  onEditDesign,
  onDeleteDesign,
  onAddNewCategory,
  onEditCategory,
  onDeleteCategory,
  onUpdateOrderStatus,
  onViewDesign,
  isAdmin,
  adminEmail,
  adminPassword,
  currentEmail,
  onChangeAdminEmail,
  onChangeAdminPassword,
  siteContent,
  onUpdateSiteContent,
  onOpenAuth
}) => {
  const [activeTab, setActiveTab] = useState<'designs' | 'categories' | 'orders' | 'workshop' | 'security' | 'content'>('designs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderToEdit, setSelectedOrderToEdit] = useState<Order | null>(null);
  const [newOrderStatus, setNewOrderStatus] = useState<OrderStage>('cnc_carving');
  const [newTrackingCode, setNewTrackingCode] = useState('');
  const [newAdminNote, setNewAdminNote] = useState('');

  // Admin Email Change state
  const [newAdminEmailInput, setNewAdminEmailInput] = useState('');
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);

  // Admin Password Change state
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);

  // Site Content Editor state
  const [editableContent, setEditableContent] = useState<SiteContent>({ ...siteContent });
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);

  // If user is not admin, show Access Denied shield
  if (!isAdmin) {
    return (
      <div className="py-20 px-4 sm:px-6 max-w-lg mx-auto text-center">
        <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center mb-4">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="font-display text-xl font-bold text-stone-100 mb-2">
            Admin Studio - Access Restricted
          </h2>

          <p className="text-xs text-stone-400 leading-relaxed mb-6">
            Yeh section sirf authorized Administrator ke liye makhsoos hai. Sirf 
            <strong className="text-amber-400 font-tech mx-1">{adminEmail}</strong> 
            aur password se login hone par hi Admin Studio ka access mil sakta hai.
          </p>

          <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-400 mb-6 font-tech">
            Current Session: <span className="text-stone-200">{currentEmail || 'Not Signed In (Guest)'}</span>
          </div>

          <button
            onClick={onOpenAuth}
            className="w-full py-3 rounded-lg text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In with Admin Password ({adminEmail})</span>
          </button>
        </div>
      </div>
    );
  }

  const filteredDesigns = designs.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.stoneType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenOrderEditor = (order: Order) => {
    setSelectedOrderToEdit(order);
    setNewOrderStatus(order.status);
    setNewTrackingCode(order.trackingNumber || '');
    setNewAdminNote(order.adminNotes || '');
  };

  const handleSaveOrderUpdate = () => {
    if (selectedOrderToEdit) {
      onUpdateOrderStatus(selectedOrderToEdit.id, newOrderStatus, newTrackingCode, newAdminNote);
      setSelectedOrderToEdit(null);
    }
  };

  const handleSaveNewAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmailInput.trim() || !newAdminEmailInput.includes('@')) {
      alert('Valid email address enter karein.');
      return;
    }
    onChangeAdminEmail(newAdminEmailInput.trim().toLowerCase());
    setEmailChangeSuccess(true);
    setNewAdminEmailInput('');
    setTimeout(() => setEmailChangeSuccess(false), 5000);
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    if (currentPassInput !== adminPassword) {
      setPassError('Purana password ghalat hai. Baraye meherbani durust password enter karein.');
      return;
    }
    if (newPassInput.length < 5) {
      setPassError('Naya password kam az kam 5 characters ka hona chahiye.');
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setPassError('Naya password aur confirm password match nahi kar rahe.');
      return;
    }

    onChangeAdminPassword(newPassInput);
    setPassSuccess(true);
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setTimeout(() => setPassSuccess(false), 5000);
  };

  const handleSaveSiteContent = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteContent(editableContent);
    setContentSaveSuccess(true);
    setTimeout(() => setContentSaveSuccess(false), 5000);
  };

  const stageLabels: Record<OrderStage, string> = {
    confirmed: '1. Confirmed & CAD Toolpath Programmed',
    cnc_programming: '2. Slab Calibration & Spindle Setup',
    cnc_carving: '3. 5-Axis CNC Diamond Milling',
    diamond_polishing: '4. Artisanal Hand Diamond Polishing',
    quality_passed: '5. Quality Inspection Passed',
    dispatched: '6. Crated in Wooden Armor & Dispatched',
    delivered: '7. Delivered & Inspected on Site'
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Admin Title & Overview Metrics */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold uppercase tracking-wider font-tech">
                Master Control Center
              </span>
              <span className="text-xs text-stone-500">·</span>
              <span className="text-xs text-emerald-400 font-tech">Authenticated Admin ({currentEmail})</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
              Admin & Production Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddNewDesign}
              className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Design</span>
            </button>

            <button
              onClick={onAddNewCategory}
              className="px-4 py-2 text-xs font-semibold text-stone-200 bg-stone-900 border border-stone-700 hover:border-amber-400 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800">
            <span className="text-[11px] text-stone-400 block mb-1">Stone Designs</span>
            <div className="flex items-baseline justify-between">
              <span className="font-tech text-2xl font-bold text-stone-100">{designs.length}</span>
              <span className="text-[11px] text-amber-400 font-tech">Catalog Active</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800">
            <span className="text-[11px] text-stone-400 block mb-1">Registered Categories</span>
            <div className="flex items-baseline justify-between">
              <span className="font-tech text-2xl font-bold text-stone-100">{categories.length}</span>
              <span className="text-[11px] text-amber-400 font-tech">Dynamic Types</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800">
            <span className="text-[11px] text-stone-400 block mb-1">Active Customer Orders</span>
            <div className="flex items-baseline justify-between">
              <span className="font-tech text-2xl font-bold text-stone-100">{orders.length}</span>
              <span className="text-[11px] text-amber-400 font-tech">In Pipeline</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800">
            <span className="text-[11px] text-stone-400 block mb-1">Admin Security</span>
            <div className="flex items-baseline justify-between">
              <span className="font-tech text-xs font-bold text-emerald-400">PASSWORD PROTECTED</span>
              <span className="text-[10px] text-stone-400 font-tech">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-stone-800 mb-6 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('designs')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'designs'
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Stone Designs ({designs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'content'
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Edit Website Texts & Content</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'security'
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Password & Email Security</span>
        </button>

        <button
          onClick={() => setActiveTab('workshop')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'workshop'
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>CNC Machinery</span>
        </button>
      </div>

      {/* TAB 1: DESIGNS MANAGER */}
      {activeTab === 'designs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search designs in admin library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={onAddNewDesign}
              className="px-4 py-2 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload New Design & Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDesigns.map((design) => {
              const catObj = categories.find((c) => c.id === design.category);

              return (
                <div
                  key={design.id}
                  className="rounded-xl overflow-hidden bg-stone-900 border border-stone-800 p-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail & Stone Badges */}
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-stone-950 mb-3 border border-stone-800">
                      <img
                        src={design.imageUrl}
                        alt={design.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-950/90 text-amber-400 text-[10px] font-tech border border-amber-500/30">
                        {design.stoneType}
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-stone-950/90 text-stone-300 text-[10px] font-tech border border-stone-700">
                        ${design.price}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-amber-500/90 font-medium mb-1">
                      <span>{catObj?.name || 'Architectural Stone'}</span>
                      <span>·</span>
                      <span className="font-tech text-stone-400">{design.machiningHours}h CNC</span>
                    </div>

                    <h4 className="font-display text-base font-bold text-stone-100 line-clamp-1 mb-1">
                      {design.title}
                    </h4>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
                      {design.description}
                    </p>

                    <div className="space-y-1 text-[11px] font-tech text-stone-300 py-2 border-t border-stone-800">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Dimensions:</span>
                        <span>{design.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Carving Depth:</span>
                        <span className="text-amber-400">{design.carvingDepth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Tool Bit:</span>
                        <span className="truncate max-w-[160px] text-stone-400">{design.cutterBit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                    <button
                      onClick={() => onViewDesign(design)}
                      className="px-2.5 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEditDesign(design)}
                        className="px-3 py-1.5 rounded bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Design</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete "${design.title}" from catalog?`)) {
                            onDeleteDesign(design.id);
                          }
                        }}
                        className="p-1.5 rounded bg-stone-800 hover:bg-rose-950/50 hover:text-rose-400 text-stone-400 transition-colors cursor-pointer"
                        title="Delete Design"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORY MANAGER */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div>
              <h3 className="font-display text-lg font-bold text-stone-100">
                Stone Categories & Carving Classifications
              </h3>
              <p className="text-xs text-stone-400">
                Create new stone groups to organize panels, jaalis, pillars, inlays, and plaques.
              </p>
            </div>

            <button
              onClick={onAddNewCategory}
              className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => {
              const count = designs.filter((d) => d.category === cat.id).length;

              return (
                <div
                  key={cat.id}
                  className="p-5 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="text-[10px] font-tech text-amber-400 uppercase tracking-wider block">
                          Category ID: {cat.slug}
                        </span>
                        <h4 className="font-display text-lg font-bold text-stone-100">
                          {cat.name}
                        </h4>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-stone-950 border border-stone-800 text-stone-300 font-tech text-xs">
                        {count} designs
                      </span>
                    </div>

                    <p className="text-xs text-stone-400 mb-3 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="text-xs text-stone-300 pt-2 border-t border-stone-800/80">
                      <span className="text-stone-500">Primary Stone: </span>
                      <span className="font-medium text-amber-300">{cat.stoneMaterial}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEditCategory(cat)}
                      className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                          onDeleteCategory(cat.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded bg-stone-800 hover:bg-rose-950/50 hover:text-rose-400 text-stone-400 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER ORDERS PIPELINE */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="pb-4 border-b border-stone-800">
            <h3 className="font-display text-lg font-bold text-stone-100">
              Customer Orders & Production Milestones
            </h3>
            <p className="text-xs text-stone-400">
              Update live CNC machining progress, assign dispatch tracking IDs, and manage stone crating.
            </p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-tech font-bold text-amber-400 text-sm">
                        {order.id}
                      </span>
                      <span>·</span>
                      <span className="text-xs text-stone-400">{order.createdAt}</span>
                      <span>·</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-tech uppercase bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                        Easypaisa Payment Verified
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-stone-100">
                      Customer: {order.customerName}
                    </h4>
                    <p className="text-xs text-stone-400">
                      {order.customerPhone} · {order.customerEmail} · {order.city}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-stone-400 block">Total Value</span>
                      <span className="font-tech text-lg font-bold text-stone-100 tabular-nums">
                        ${order.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenOrderEditor(order)}
                      className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Update CNC Status</span>
                    </button>
                  </div>
                </div>

                {/* Ordered Items summary */}
                <div className="py-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-stone-950 border border-stone-800/80">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded object-cover border border-stone-700"
                      />
                      <div className="truncate">
                        <span className="font-semibold text-stone-200 block truncate">{item.title}</span>
                        <span className="text-[11px] text-stone-400">
                          {item.stoneType} · Qty: {item.quantity} · ${item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current Stage Ribbon */}
                <div className="pt-3 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400">Current Factory Stage:</span>
                    <span className="px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/40 text-amber-300 font-semibold font-tech">
                      {stageLabels[order.status] || order.status}
                    </span>
                  </div>

                  {order.trackingNumber && (
                    <div className="flex items-center gap-2 font-tech text-[11px]">
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-stone-400">{order.courier}:</span>
                      <span className="text-amber-300 font-bold">{order.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Edit Order Modal */}
          {selectedOrderToEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
              <div className="relative w-full max-w-lg rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold text-stone-100 mb-1">
                  Update Production for {selectedOrderToEdit.id}
                </h3>
                <p className="text-xs text-stone-400 mb-5">
                  Set live CNC milestone visible to customer in order tracking
                </p>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-stone-300 block mb-1.5">
                      Production Milestone Stage:
                    </label>
                    <select
                      value={newOrderStatus}
                      onChange={(e) => setNewOrderStatus(e.target.value as OrderStage)}
                      className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="confirmed">1. Confirmed & CAD Programmed</option>
                      <option value="cnc_programming">2. Slab Calibration & Spindle Setup</option>
                      <option value="cnc_carving">3. 5-Axis CNC Diamond Milling</option>
                      <option value="diamond_polishing">4. Artisanal Hand Diamond Polishing</option>
                      <option value="quality_passed">5. Quality Inspection Passed</option>
                      <option value="dispatched">6. Crated in Wooden Armor & Dispatched</option>
                      <option value="delivered">7. Delivered & Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-300 block mb-1.5">
                      Logistics Courier / Flatbed Fleet:
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedOrderToEdit.courier || 'R.A.S Heavy Stone Flatbed Logistics'}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-300 block mb-1.5">
                      Tracking Code / Consignment Number:
                    </label>
                    <input
                      type="text"
                      value={newTrackingCode}
                      onChange={(e) => setNewTrackingCode(e.target.value)}
                      placeholder="e.g., RAS-PK-982341"
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-500 font-tech"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-300 block mb-1.5">
                      Admin Workshop Notes:
                    </label>
                    <textarea
                      rows={2}
                      value={newAdminNote}
                      onChange={(e) => setNewAdminNote(e.target.value)}
                      placeholder="Spindle #2 engaged, 4mm diamond bit installed..."
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOrderToEdit(null)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-stone-400 hover:text-stone-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveOrderUpdate}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 cursor-pointer shadow"
                  >
                    Save & Update Milestone
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SITE CONTENT & TEXT CUSTOMIZER */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl max-w-4xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Type className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-stone-100">
                    Live Website Text & Content Customizer
                  </h3>
                  <p className="text-xs text-stone-400">
                    Aap yahan se website ki tamam headlines, descriptions, contact info, aur Easypaisa details apni marzi se tabdeel kar sakte hain.
                  </p>
                </div>
              </div>

              {contentSaveSuccess && (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Website Texts Updated Successfully!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSiteContent} className="space-y-5">
              
              {/* Branding Section */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-tech">
                  1. Brand Logo & Title Texts
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-300 block mb-1">Brand Name / Logo Title</label>
                    <input
                      type="text"
                      value={editableContent.brandTitle}
                      onChange={(e) => setEditableContent({ ...editableContent, brandTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-300 block mb-1">Brand Subtitle / Tagline</label>
                    <input
                      type="text"
                      value={editableContent.brandSubtitle}
                      onChange={(e) => setEditableContent({ ...editableContent, brandSubtitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Banner Section */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-tech">
                  2. Hero Showcase Headlines
                </span>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">Kicker Badge (Chhota Top Label)</label>
                  <input
                    type="text"
                    value={editableContent.heroKicker}
                    onChange={(e) => setEditableContent({ ...editableContent, heroKicker: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">Main Big Headline</label>
                  <input
                    type="text"
                    value={editableContent.heroHeadline}
                    onChange={(e) => setEditableContent({ ...editableContent, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs font-display focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">Hero Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={editableContent.heroDescription}
                    onChange={(e) => setEditableContent({ ...editableContent, heroDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              </div>

              {/* Easypaisa Account Details Editor */}
              <div className="p-4 rounded-xl bg-stone-950 border border-emerald-500/30 space-y-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block font-tech">
                  3. Easypaisa Payment Account Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-300 block mb-1">Easypaisa Account Title (Name)</label>
                    <input
                      type="text"
                      value={editableContent.easypaisaAccountName}
                      onChange={(e) => setEditableContent({ ...editableContent, easypaisaAccountName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-emerald-500/50 text-emerald-300 text-xs font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-300 block mb-1">Easypaisa Mobile Number</label>
                    <input
                      type="text"
                      value={editableContent.easypaisaAccountNumber}
                      onChange={(e) => setEditableContent({ ...editableContent, easypaisaAccountNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-emerald-500/50 text-emerald-300 text-xs font-tech font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-tech">
                  4. Workshop Contact & Address
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-300 block mb-1">Contact Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={editableContent.workshopContactPhone}
                      onChange={(e) => setEditableContent({ ...editableContent, workshopContactPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs font-tech focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-300 block mb-1">Workshop Factory Address</label>
                    <input
                      type="text"
                      value={editableContent.workshopAddress}
                      onChange={(e) => setEditableContent({ ...editableContent, workshopAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Site Texts & Content</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* TAB 5: PASSWORD & SECURITY SETTINGS */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
            
            {/* Card 1: Change Admin Password */}
            <div className="p-6 sm:p-7 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-800 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-stone-100">
                    Change Admin Password
                  </h3>
                  <p className="text-xs text-stone-400">
                    Current Default: <code className="text-amber-400 font-tech">imraNal1@</code>
                  </p>
                </div>
              </div>

              {passSuccess && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Password kamyabi se tabdeel ho gaya hai!</span>
                </div>
              )}

              {passError && (
                <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{passError}</span>
                </div>
              )}

              <form onSubmit={handleSaveNewPassword} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-stone-300 block mb-1">Current Admin Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 font-tech focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-stone-300 block mb-1">New Admin Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 font-tech focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-stone-300 block mb-1">Confirm New Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={confirmPassInput}
                    onChange={(e) => setConfirmPassInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 font-tech focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow"
                  >
                    Update Admin Password
                  </button>
                </div>
              </form>
            </div>

            {/* Card 2: Master Admin Email Transfer */}
            <div className="p-6 sm:p-7 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-800 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-stone-100">
                    Master Admin Gmail
                  </h3>
                  <p className="text-xs text-stone-400">
                    Authorized Master Email: <span className="text-amber-400 font-tech">{adminEmail}</span>
                  </p>
                </div>
              </div>

              {emailChangeSuccess && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Master Admin Email update ho gayi hai!</span>
                </div>
              )}

              <form onSubmit={handleSaveNewAdminEmail} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-stone-300 block mb-1">
                    Transfer Master Admin Access to New Gmail:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="newadmin@gmail.com"
                    value={newAdminEmailInput}
                    onChange={(e) => setNewAdminEmailInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 font-tech focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-stone-400 mt-1">
                    Is ke baad sirf yeh nayi Gmail email aur password se hi Admin Studio open hoga.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setNewAdminEmailInput('imranmramzan7@gmail.com')}
                    className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                  >
                    Reset (imranmramzan7@gmail.com)
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow"
                  >
                    Update Master Gmail
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* TAB 6: CNC MACHINERY DIAGNOSTICS */}
      {activeTab === 'workshop' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-800">
              <div>
                <h3 className="font-display text-lg font-bold text-stone-100">
                  R.A.S 5-Axis Heavy Gantry Router #01
                </h3>
                <p className="text-xs text-stone-400">
                  Real-time Spindle telemetry, diamond tool bit degradation, and cooling pressure.
                </p>
              </div>

              <span className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-tech">
                STATUS: MACHINING SLAB
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-tech">
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 block text-[10px]">Active X-Axis</span>
                <span className="text-stone-100 font-bold text-sm">1,420.5 mm</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 block text-[10px]">Active Y-Axis</span>
                <span className="text-stone-100 font-bold text-sm">890.2 mm</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 block text-[10px]">Active Z-Depth</span>
                <span className="text-amber-400 font-bold text-sm">-24.8 mm</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 block text-[10px]">Feed Rate</span>
                <span className="text-emerald-400 font-bold text-sm">850 mm/min</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800/80 space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-stone-400">Diamond PCD Bit Wear (Rack Position 04)</span>
                  <span className="font-tech text-amber-400">88% Lifespan Left</span>
                </div>
                <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-stone-400">High-Pressure Waterjet Mist Coolant Pressure</span>
                  <span className="font-tech text-emerald-400">4.2 Bar (Optimal)</span>
                </div>
                <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[94%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
