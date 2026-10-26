import React, { useState } from 'react';
import { CustomerProfile, Order, OrderItem, SiteContent } from '../types/stone';
import { INITIAL_SITE_CONTENT } from '../data/initialData';
import { 
  X, Smartphone, ShieldCheck, Lock, CheckCircle2, 
  ArrowRight, Loader2, Copy, Check, Upload, Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: OrderItem[];
  profile: CustomerProfile;
  onPaymentSuccess: (order: Order) => void;
  siteContent?: SiteContent;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  profile,
  onPaymentSuccess,
  siteContent = INITIAL_SITE_CONTENT
}) => {
  if (!isOpen) return null;

  // Pricing (USD & PKR calculation: $1 ≈ Rs. 280)
  const PKR_RATE = 280;
  const subtotalUSD = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cratingFeeUSD = subtotalUSD > 0 ? 120 : 0;
  const totalUSD = subtotalUSD + cratingFeeUSD;

  // Deposit vs Full payment mode
  const [paymentOption, setPaymentOption] = useState<'full' | 'deposit'>('full');
  const depositUSD = Math.round(totalUSD * 0.5);
  const payableUSD = paymentOption === 'deposit' ? depositUSD : totalUSD;
  const payablePKR = payableUSD * PKR_RATE;

  // Easypaisa Account Details specified by the user or updated by admin
  const EASYPAISA_ACCOUNT_NAME = siteContent.easypaisaAccountName || 'MUHAMMAD IMRAN';
  const EASYPAISA_ACCOUNT_NUMBER = siteContent.easypaisaAccountNumber || '03702544574';

  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  // Form Fields
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [senderName, setSenderName] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  // Customer Delivery Info
  const [customerName, setCustomerName] = useState(profile.name || 'Muhammad Imran Ramzan');
  const [customerPhone, setCustomerPhone] = useState(profile.phone || '+92 300 8472910');
  const [customerEmail, setCustomerEmail] = useState(profile.email || 'imranmramzan7@gmail.com');
  const [deliveryAddress, setDeliveryAddress] = useState(profile.address || 'House 42, Block D, Phase 5, DHA');
  const [city, setCity] = useState(profile.city || 'Lahore');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const copyToClipboard = (text: string, type: 'number' | 'name') => {
    navigator.clipboard.writeText(text);
    if (type === 'number') {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2500);
    } else {
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 2500);
    }
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setScreenshotUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      alert('Meherbani farma kar Easypaisa 3737 Transaction ID (TID) enter karein.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `RAS-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingCode = `RAS-PK-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        id: generatedOrderId,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        city,
        items: [...cartItems],
        totalAmount: totalUSD,
        depositAmount: payableUSD,
        paymentStatus: paymentOption === 'deposit' ? 'deposit_paid' : 'paid',
        paymentMethod: 'easypaisa',
        status: 'confirmed',
        trackingNumber: trackingCode,
        courier: 'R.A.S Heavy Logistics Flatbed Fleet',
        createdAt: new Date().toISOString().split('T')[0],
        estimatedDelivery: 'Within 10-14 working days',
        adminNotes: `Easypaisa payment verified. Account: 03702544574 (MUHAMMAD IMRAN). Sender: ${senderNumber || customerPhone}, TID: ${transactionId}.`,
        timeline: [
          {
            stage: 'Order Confirmed & Easypaisa Payment Verified',
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            completed: true,
            details: `Easypaisa payment to MUHAMMAD IMRAN (03702544574) verified. TID: #${transactionId.toUpperCase()}`
          },
          {
            stage: 'Slab Calibration & Alignment',
            date: 'Queued next 24-48 hours',
            completed: false,
            details: 'Natural stone slab selection and surface leveling on CNC vacuum table.'
          },
          {
            stage: '5-Axis CNC Diamond Milling',
            date: 'Pending',
            completed: false,
            details: 'Sub-millimeter spindle carving at 24,000 RPM with diamond water mist coolant.'
          },
          {
            stage: 'Hand Craft Polishing & Diamond Buffing',
            date: 'Pending',
            completed: false,
            details: 'Artisan hand detailing with 3000 grit diamond pads.'
          },
          {
            stage: 'Wooden Crate Packing & Safe Transit',
            date: 'Pending',
            completed: false,
            details: 'Wooden armor crating with shock-absorbing foam suspension.'
          }
        ]
      };

      setCompletedOrder(newOrder);
      onPaymentSuccess(newOrder);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Payment Success State */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Easypaisa Payment Received & Verified
              </div>

              <h2 className="font-display text-2xl font-bold text-stone-100">
                Order Confirmed: {completedOrder.id}
              </h2>
              <p className="text-xs text-stone-300 mt-1 max-w-md mx-auto">
                Shukriya! Aapki payment <strong className="text-amber-400 font-tech">Rs. {payablePKR.toLocaleString()} (${payableUSD.toLocaleString()})</strong> receive ho chuki hai. Aapka CNC stone order production queue me enter ho gaya hai.
              </p>
            </div>

            {/* Tracking Receipt Card */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-left space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-stone-800/80 font-tech">
                <span className="text-stone-400">Order ID:</span>
                <span className="text-stone-100 font-bold">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-800/80 font-tech">
                <span className="text-stone-400">Payment Channel:</span>
                <span className="text-emerald-400 font-bold">Easypaisa (03702544574)</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-800/80 font-tech">
                <span className="text-stone-400">Transaction ID (TID):</span>
                <span className="text-amber-400 font-bold">{transactionId}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-800/80 font-tech">
                <span className="text-stone-400">Assigned Tracking:</span>
                <span className="text-amber-400 font-bold">{completedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Delivery Address:</span>
                <span className="text-stone-200 text-right">{completedOrder.deliveryAddress}, {completedOrder.city}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Order in Client Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Easypaisa Payment Checkout Form */
          <div>
            {/* Header */}
            <div className="pb-4 border-b border-stone-800 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-stone-950 font-bold text-xs shadow-sm">
                  EP
                </div>
                <span className="text-[11px] font-tech text-emerald-400 uppercase tracking-wider font-semibold">
                  Official Easypaisa Payment Gateway
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-100">
                Easypaisa Stone Commission Payment
              </h2>
            </div>

            {/* Official Easypaisa Account Details Box */}
            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-stone-950 to-stone-900 border-2 border-emerald-500/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                <Smartphone className="w-24 h-24 text-emerald-400" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500 text-stone-950 font-bold text-xs">
                      easypaisa
                    </span>
                    <span className="text-xs text-stone-300 font-semibold">
                      Account Details (براہِ کرم اس اکاؤنٹ پر رقم بھیجیں)
                    </span>
                  </div>
                  <span className="text-[10px] font-tech text-emerald-400">
                    Instant Auto-Verify
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Account Name */}
                  <div className="p-3 rounded-xl bg-stone-950/80 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-tech">Account Name (Title)</span>
                      <strong className="text-sm font-bold text-emerald-300 tracking-wide block">
                        {EASYPAISA_ACCOUNT_NAME}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(EASYPAISA_ACCOUNT_NAME, 'name')}
                      className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                      title="Copy Account Name"
                    >
                      {copiedName ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Account Number */}
                  <div className="p-3 rounded-xl bg-stone-950/80 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-tech">Easypaisa Mobile Number</span>
                      <strong className="text-base font-bold text-amber-400 font-tech tracking-wider block">
                        {EASYPAISA_ACCOUNT_NUMBER}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(EASYPAISA_ACCOUNT_NUMBER, 'number')}
                      className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors cursor-pointer"
                      title="Copy Mobile Number"
                    >
                      {copiedNumber ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick Urdu instructions */}
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200/90 flex items-start gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Apne <strong>Easypaisa App</strong> ya <strong>*786#</strong> se is number <strong>03702544574</strong> par payment transfer karein aur neeche <strong>Transaction ID (TID)</strong> darj karein.
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Amount & Deposit Option Selector */}
            <div className="mb-6 p-4 rounded-xl bg-stone-950 border border-stone-800">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-stone-400">Total Project Value ({cartItems.length} items + crating):</span>
                <span className="font-tech text-stone-200 font-bold">${totalUSD} USD (Rs. {(totalUSD * PKR_RATE).toLocaleString()})</span>
              </div>

              {/* Deposit Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentOption('full')}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    paymentOption === 'full'
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span className="block text-[11px]">Pay Full Amount</span>
                  <span className="font-tech text-sm text-stone-100">
                    Rs. {(totalUSD * PKR_RATE).toLocaleString()} (${totalUSD})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentOption('deposit')}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    paymentOption === 'deposit'
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span className="block text-[11px]">50% CNC Advance Deposit</span>
                  <span className="font-tech text-sm text-amber-400">
                    Rs. {(depositUSD * PKR_RATE).toLocaleString()} (${depositUSD})
                  </span>
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-300">Amount to send on Easypaisa:</span>
                <div className="text-right">
                  <span className="font-tech text-lg font-extrabold text-amber-400 tabular-nums">
                    Rs. {payablePKR.toLocaleString()} PKR
                  </span>
                  <span className="text-[11px] text-stone-400 block font-tech">(${payableUSD} USD)</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
              
              {/* Easypaisa Transaction Verification Details */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                <span className="font-semibold text-stone-200 block text-xs">
                  Easypaisa Transaction Verification (3737 SMS Details)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-300 block mb-1">
                      Your Sender Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 03001234567"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 font-tech focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-emerald-300 font-semibold block mb-1">
                      3737 Transaction ID (TID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 11-digit TID: 24089172635"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-stone-900 border-2 border-emerald-500/70 text-emerald-300 font-tech font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* Optional Screenshot Upload */}
                <div>
                  <label className="text-[11px] text-stone-400 block mb-1">
                    Upload Payment Screenshot (Optional / اختیاری)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-medium cursor-pointer flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{screenshotUrl ? 'Change Screenshot' : 'Choose Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotUpload}
                        className="hidden"
                      />
                    </label>
                    {screenshotUrl && (
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Screenshot attached
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Site Details */}
              <div className="pt-2">
                <span className="font-semibold text-stone-300 block mb-2">
                  Delivery Site Details (ڈیلیوری ایڈریس)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-stone-400 block mb-1">Customer Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-400 block mb-1">Contact Phone *</label>
                    <input
                      type="text"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 font-tech focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-stone-400 block mb-1">Street / Villa / Site Address *</label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Total Due</span>
                  <span className="font-tech text-lg font-bold text-amber-400 tabular-nums">
                    Rs. {payablePKR.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-3 rounded-lg text-xs font-bold text-stone-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                      <span>Verifying Easypaisa TID...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-stone-950" />
                      <span>Verify Easypaisa & Place Order</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
