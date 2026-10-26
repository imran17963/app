import React from 'react';
import { OrderItem } from '../types/stone';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (designId: string, delta: number) => void;
  onRemoveItem: (designId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cratingFee = items.length > 0 ? 120 : 0;
  const grandTotal = subtotal + cratingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-lg font-bold text-stone-100">
                Stone Commission Bag
              </h2>
              <span className="text-xs font-tech text-amber-400 font-semibold px-2 py-0.5 rounded bg-stone-950 border border-stone-800">
                {items.length} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                <h3 className="font-display text-base font-bold text-stone-300">Your bag is empty</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Add 3D bas-relief panels, jaali grills, or columns from the catalog.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.designId}
                  className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex gap-3.5 items-start"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover border border-stone-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-stone-100 truncate">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.designId)}
                        className="text-stone-500 hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[11px] font-tech text-amber-400 block mb-1">
                      {item.stoneType}
                    </span>

                    <span className="text-[10px] text-stone-500 block mb-2 font-tech">
                      {item.dimensions}
                    </span>

                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg px-2 py-0.5 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.designId, -1)}
                          className="text-stone-400 hover:text-white px-1 font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-tech text-stone-200">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.designId, 1)}
                          className="text-stone-400 hover:text-white px-1 font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-tech text-xs font-bold text-stone-100 tabular-nums">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950/80 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal:</span>
                  <span className="font-tech text-stone-200">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    Wooden Armor Crating & Fragile Transit:
                  </span>
                  <span className="font-tech text-stone-200">${cratingFee}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-sm">
                  <span className="text-stone-100">Estimated Total:</span>
                  <span className="font-tech text-amber-400 text-base">${grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3 rounded-lg text-xs font-bold text-stone-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 hover:from-emerald-300 hover:to-amber-300 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Proceed to Easypaisa Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
