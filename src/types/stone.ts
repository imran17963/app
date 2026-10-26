export type StoneType = 
  | 'Carrara White Marble'
  | 'Jet Black Granite'
  | 'Jodhpur Teak Sandstone'
  | 'Italian Beige Travertine'
  | 'Onyx Emerald Green'
  | 'Makrana Pure White Marble'
  | 'Red Agra Sandstone';

export interface StoneDesign {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  stoneType: StoneType | string;
  dimensions: string;
  carvingDepth: string;
  cutterBit: string;
  machiningHours: number;
  price: number;
  unit: string;
  description: string;
  features: string[];
  inStock: boolean;
  isCustomizable: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  stoneMaterial: string;
  imageUrl?: string;
}

export type OrderStage = 
  | 'confirmed'
  | 'cnc_programming'
  | 'cnc_carving'
  | 'diamond_polishing'
  | 'quality_passed'
  | 'dispatched'
  | 'delivered';

export interface OrderTimelineItem {
  stage: string;
  date: string;
  completed: boolean;
  details: string;
}

export interface OrderItem {
  designId: string;
  title: string;
  stoneType: string;
  dimensions: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  items: OrderItem[];
  totalAmount: number;
  depositAmount: number;
  paymentStatus: 'paid' | 'deposit_paid' | 'pending';
  paymentMethod: 'easypaisa' | 'credit_card' | 'bank_transfer' | 'jazzcash_easypaisa' | 'cod';
  status: OrderStage;
  trackingNumber: string;
  courier: string;
  createdAt: string;
  estimatedDelivery: string;
  timeline: OrderTimelineItem[];
  adminNotes?: string;
}

export interface CustomerProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export interface QuoteRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  stoneType: string;
  dimensions: string;
  estimatedBudget: string;
  notes: string;
  referenceImageUrl?: string;
  createdAt: string;
  status: 'reviewing' | 'estimated' | 'approved';
}

export interface SiteContent {
  brandTitle: string;
  brandSubtitle: string;
  heroKicker: string;
  heroHeadline: string;
  heroDescription: string;
  workshopContactPhone: string;
  workshopAddress: string;
  easypaisaAccountName: string;
  easypaisaAccountNumber: string;
}

