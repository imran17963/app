import React, { useState } from 'react';
import { CustomerProfile, Order, QuoteRequest } from '../types/stone';
import { 
  User, Phone, Mail, MapPin, Package, Clock, Truck, 
  CheckCircle2, AlertCircle, FileText, Upload, Sparkles, Send
} from 'lucide-react';

interface UserProfileProps {
  profile: CustomerProfile;
  orders: Order[];
  onUpdateProfile: (updated: CustomerProfile) => void;
  onSubmitQuote: (quote: QuoteRequest) => void;
  onSelectOrderForTracking: (orderId: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  profile,
  orders,
  onUpdateProfile,
  onSubmitQuote,
  onSelectOrderForTracking
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState(profile.address);
  const [city, setCity] = useState(profile.city);

  // Custom Quote Form state
  const [quoteStone, setQuoteStone] = useState('Carrara White Marble');
  const [quoteDimensions, setQuoteDimensions] = useState('60" x 84" x 2"');
  const [quoteBudget, setQuoteBudget] = useState('$1,500 - $3,000');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, phone, email, address, city });
    setIsEditingProfile(false);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote: QuoteRequest = {
      id: `QR-${Date.now().toString().slice(-4)}`,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      stoneType: quoteStone,
      dimensions: quoteDimensions,
      estimatedBudget: quoteBudget,
      notes: quoteNotes,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'reviewing'
    };
    onSubmitQuote(newQuote);
    setQuoteSubmitted(true);
    setTimeout(() => setQuoteSubmitted(false), 5000);
    setQuoteNotes('');
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
      
      {/* Top Profile Card */}
      <div className="rounded-2xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-display text-2xl font-bold shadow-lg shadow-amber-950/40">
              {profile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-stone-100">{profile.name}</h1>
                <span className="px-2 py-0.5 rounded bg-stone-950 border border-amber-500/30 text-amber-400 text-[10px] font-tech uppercase">
                  Verified Client
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                R.A.S Client Portal · Stone Delivery & Fabrication Tracking
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-200 bg-stone-950 border border-stone-700 hover:border-amber-400 transition-colors self-start md:self-auto cursor-pointer"
          >
            {isEditingProfile ? 'Cancel Editing' : 'Edit Contact Details'}
          </button>
        </div>

        {/* Profile Info or Edit Form */}
        {isEditingProfile ? (
          <form onSubmit={handleSaveProfile} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-stone-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-stone-400 block mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-tech"
              />
            </div>
            <div>
              <label className="text-xs text-stone-400 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-stone-400 block mb-1">Site / Delivery Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-stone-400 block mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="sm:col-span-3 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Save Contact Details
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-stone-500 block text-[10px]">Contact Phone</span>
                <span className="text-stone-200 font-tech">{profile.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-stone-500 block text-[10px]">Email Dispatch</span>
                <span className="text-stone-200 truncate block max-w-[170px]">{profile.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800 sm:col-span-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-stone-500 block text-[10px]">Architectural Site Address</span>
                <span className="text-stone-200">{profile.address}, {profile.city}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: LIVE ORDER TRACKING & FACTORY TIMELINE */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 block">
              Active Stone Commissions
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-100">
              Your CNC Orders & Live Tracking
            </h2>
          </div>
          <span className="text-xs text-stone-400 font-tech">
            {orders.length} orders on file
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-stone-900/60 border border-stone-800">
            <Package className="w-10 h-10 text-stone-500 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-stone-200">No active orders yet</h3>
            <p className="text-xs text-stone-400 mt-1">Browse our designs catalog to commission your first piece.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              return (
                <div
                  key={order.id}
                  className="rounded-2xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-tech text-base font-bold text-amber-400">
                          {order.id}
                        </span>
                        <span className="text-xs text-stone-500">·</span>
                        <span className="text-xs text-stone-400">Placed on {order.createdAt}</span>
                        <span className="text-xs text-stone-500">·</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-tech uppercase bg-amber-500/10 border border-amber-500/30 text-amber-300">
                          {order.paymentStatus === 'paid' ? 'Full Paid' : 'Deposit Paid (50%)'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300">
                        <span>Courier: <strong className="text-stone-100">{order.courier}</strong></span>
                        {order.trackingNumber && (
                          <span className="font-tech text-amber-400 font-bold">
                            Tracking: {order.trackingNumber}
                          </span>
                        )}
                        <span>Est. Delivery: <strong className="text-stone-100">{order.estimatedDelivery}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-stone-400 block">Total</span>
                        <span className="font-tech text-xl font-bold text-stone-100 tabular-nums">
                          ${order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual 5-Stage Stepper for Real-time Tracking */}
                  <div className="py-8">
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-4">
                      Live CNC Workshop Progress:
                    </span>

                    <div className="relative">
                      {/* Stepper Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                        {order.timeline.map((step, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border transition-all ${
                              step.completed
                                ? 'bg-amber-950/20 border-amber-500/60 text-stone-100'
                                : 'bg-stone-950/40 border-stone-800 text-stone-500'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {step.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-stone-700 shrink-0" />
                              )}
                              <span className={`text-[11px] font-tech font-bold ${step.completed ? 'text-amber-400' : 'text-stone-500'}`}>
                                Step 0{idx + 1}
                              </span>
                            </div>

                            <h4 className={`text-xs font-semibold mb-1 ${step.completed ? 'text-stone-100' : 'text-stone-400'}`}>
                              {step.stage}
                            </h4>

                            <span className="text-[10px] font-tech text-stone-400 block mb-1">
                              {step.date}
                            </span>

                            <p className="text-[11px] text-stone-400 leading-tight">
                              {step.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Items Ordered List */}
                  <div className="pt-6 border-t border-stone-800">
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-3">
                      Ordered Architectural Stone Works:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-lg object-cover border border-stone-700"
                          />
                          <div className="truncate flex-1">
                            <h4 className="text-xs font-bold text-stone-100 truncate">{item.title}</h4>
                            <span className="text-[11px] text-amber-400 block font-tech">{item.stoneType}</span>
                            <div className="flex items-center justify-between text-[11px] text-stone-400 mt-1">
                              <span>Qty: {item.quantity}</span>
                              <span className="font-tech text-stone-200">${item.price * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin Workshop Notes if any */}
                  {order.adminNotes && (
                    <div className="mt-4 p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300">
                      <span className="text-amber-400 font-semibold block mb-0.5">CNC Master Craftsman Note:</span>
                      <p className="text-stone-400">{order.adminNotes}</p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 3: REQUEST CUSTOM CNC CARVING QUOTE */}
      <div className="rounded-2xl bg-stone-900 border border-stone-800 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-stone-100">
              Request Custom 3D CNC Quote
            </h3>
            <p className="text-xs text-stone-400">
              Have specific architectural blueprints, villa elevations, or custom stone artwork?
            </p>
          </div>
        </div>

        {quoteSubmitted && (
          <div className="my-4 p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Thank you! Your custom CNC proposal has been submitted to R.A.S engineers. Our master mason will contact you within 4 hours.</span>
          </div>
        )}

        <form onSubmit={handleQuoteSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Preferred Stone Material</label>
              <select
                value={quoteStone}
                onChange={(e) => setQuoteStone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Carrara White Marble">Carrara White Marble (Italy)</option>
                <option value="Makrana Pure White Marble">Makrana Pure White Marble</option>
                <option value="Jet Black Granite">Jet Black Granite</option>
                <option value="Jodhpur Teak Sandstone">Jodhpur Teak Sandstone</option>
                <option value="Italian Beige Travertine">Italian Beige Travertine</option>
                <option value="Emerald Green Onyx">Emerald Green Onyx</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Target Dimensions</label>
              <input
                type="text"
                placeholder='e.g., 72" x 96" x 3"'
                value={quoteDimensions}
                onChange={(e) => setQuoteDimensions(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-tech"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Estimated Budget (USD / PKR)</label>
              <input
                type="text"
                placeholder="e.g., $2,000 - $4,000"
                value={quoteBudget}
                onChange={(e) => setQuoteBudget(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-tech"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Project Description & Requirements
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe your wall relief, jaali grid, temple pillar, or fireplace carving requirements..."
              value={quoteNotes}
              onChange={(e) => setQuoteNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Custom CNC Request</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
