import React, { useState } from 'react';
import { Order } from '../types/stone';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, Printer } from 'lucide-react';

interface OrderTrackingViewProps {
  orders: Order[];
  initialTrackingId?: string;
  onOpenCatalog: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orders,
  initialTrackingId = '',
  onOpenCatalog
}) => {
  const [searchInput, setSearchInput] = useState(initialTrackingId || 'RAS-7821');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders.find((o) => o.id === (initialTrackingId || 'RAS-7821')) || orders[0] || null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === query ||
        (o.trackingNumber && o.trackingNumber.toUpperCase() === query)
    );
    if (found) {
      setSelectedOrder(found);
    } else {
      alert(`No order found matching "${query}". Try sample orders: RAS-7821 or RAS-6510`);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500 block mb-2">
          Real-Time CNC Production
        </span>
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-100 mb-3">
          Track Your Stone Carving Order
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Enter your Order ID (e.g. <span className="font-tech text-amber-400">RAS-7821</span>) or courier tracking number to monitor live 5-axis milling, diamond polishing, and crated dispatch.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Order ID (RAS-7821, RAS-6510)..."
              className="w-full pl-9 pr-4 py-3 rounded-lg bg-stone-900 border border-stone-800 text-stone-100 text-xs font-tech uppercase focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md cursor-pointer shrink-0"
          >
            Track Commission
          </button>
        </form>

        {/* Quick Sample IDs */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-stone-400">
          <span>Sample Orders:</span>
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setSearchInput(o.id);
                setSelectedOrder(o);
              }}
              className="font-tech text-amber-400 underline hover:text-amber-300 cursor-pointer"
            >
              {o.id}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Order Card */}
      {selectedOrder ? (
        <div className="rounded-2xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-8">
          
          {/* Order Header Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-tech text-lg font-bold text-amber-400">
                  {selectedOrder.id}
                </span>
                <span className="text-xs text-stone-500">·</span>
                <span className="text-xs text-stone-400">Commissioned on {selectedOrder.createdAt}</span>
                <span className="text-xs text-stone-500">·</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-tech uppercase bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  {selectedOrder.paymentStatus === 'paid' ? 'Full Paid' : '50% Deposit Verified'}
                </span>
              </div>

              <h2 className="font-display text-xl font-bold text-stone-100">
                Client: {selectedOrder.customerName}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {selectedOrder.deliveryAddress}, {selectedOrder.city}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-[10px] uppercase text-stone-400">Logistics Courier Tracking</span>
              <span className="font-tech text-sm font-bold text-stone-100">
                {selectedOrder.trackingNumber || 'Tracking ID in generation'}
              </span>
              <span className="text-xs text-stone-400">Carrier: {selectedOrder.courier}</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-stone-100">
                Manufacturing & Logistics Timeline
              </h3>
              <span className="text-xs text-amber-400 font-tech">
                Est. Site Delivery: {selectedOrder.estimatedDelivery}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
              {selectedOrder.timeline.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border relative transition-all ${
                    step.completed
                      ? 'bg-amber-950/20 border-amber-500/60 text-stone-100 shadow-sm'
                      : 'bg-stone-950/40 border-stone-800 text-stone-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-tech font-bold ${step.completed ? 'text-amber-400' : 'text-stone-500'}`}>
                      Phase 0{idx + 1}
                    </span>
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-stone-600 shrink-0" />
                    )}
                  </div>

                  <h4 className={`text-xs font-semibold mb-1 ${step.completed ? 'text-stone-100' : 'text-stone-400'}`}>
                    {step.stage}
                  </h4>

                  <span className="text-[10px] font-tech text-stone-400 block mb-1.5">
                    {step.date}
                  </span>

                  <p className="text-[11px] text-stone-400 leading-normal">
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Machine & Production Notes */}
          {selectedOrder.adminNotes && (
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs">
              <span className="font-semibold text-amber-400 block mb-1 font-tech">
                CNC Operator & Factory Log:
              </span>
              <p className="text-stone-300">{selectedOrder.adminNotes}</p>
            </div>
          )}

          {/* Workpieces in this Commission */}
          <div>
            <h3 className="font-display text-sm font-bold text-stone-200 mb-3">
              Stone Items in this Consignment
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-stone-950 border border-stone-800"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover border border-stone-700 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-100 truncate">{item.title}</h4>
                    <span className="text-[11px] text-amber-400 font-tech block">{item.stoneType}</span>
                    <span className="text-[10px] text-stone-500 font-tech block">{item.dimensions}</span>
                    <div className="flex items-center justify-between text-xs mt-1 text-stone-300">
                      <span>Qty: {item.quantity}</span>
                      <span className="font-tech font-bold">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-stone-900 border border-stone-800">
          <Package className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-stone-200">No Order Selected</h3>
          <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
            Use the search bar above to look up an active stone fabrication order.
          </p>
        </div>
      )}

    </div>
  );
};
