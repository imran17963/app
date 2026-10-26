import { Category, CustomerProfile, Order, StoneDesign } from '../types/stone';

export const HERO_IMAGE = '/src/assets/images/hero_cnc_stone_machine_1792994103209.jpg';
export const TOOLS_WORKSHOP_IMAGE = '/src/assets/images/cnc_tools_cutters_workshop_1792994104382.jpg';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-relief',
    name: '3D Bas-Relief Panels',
    slug: '3d-bas-relief',
    description: 'High-depth sculptural wall panels, floral & acanthus baroque reliefs machined to perfection.',
    stoneMaterial: 'Italian Carrara Marble & White Onyx',
    imageUrl: '/src/assets/images/stone_design_3d_relief_1792994105139.jpg'
  },
  {
    id: 'cat-jaali',
    name: 'Architectural Jaali & Grills',
    slug: 'jaali-grills',
    description: 'Intricate geometric screens, Islamic arabesque perforated lattices for partitions & elevations.',
    stoneMaterial: 'Jodhpur Teak & Red Sandstone',
    imageUrl: '/src/assets/images/stone_design_jaali_screen_1792994104562.jpg'
  },
  {
    id: 'cat-inlay',
    name: 'Luxury Waterjet Floor Inlays',
    slug: 'waterjet-inlays',
    description: 'Ultra-precision waterjet CNC medallion crests, brass-bordered floral floor carpets.',
    stoneMaterial: 'Nero Marquina & Greek Statuario',
    imageUrl: '/src/assets/images/stone_design_floor_inlay_1792994183891.jpg'
  },
  {
    id: 'cat-pillars',
    name: 'Carved Columns & Pillars',
    slug: 'columns-pillars',
    description: 'Corinthian capitals, fluted architectural columns, and stone temple entry colonnades.',
    stoneMaterial: 'Makrana Pure White Marble',
    imageUrl: '/src/assets/images/stone_design_marble_pillar_1792994182615.jpg'
  },
  {
    id: 'cat-engraving',
    name: 'CNC Engraved Plaques & Crests',
    slug: 'engraved-crests',
    description: 'Deep V-carve diamond engraving for estate nameplates, royal seals, and monumental inscriptions.',
    stoneMaterial: 'Jet Black Granite & Dark Emperador',
    imageUrl: '/src/assets/images/cnc_tools_cutters_workshop_1792994104382.jpg'
  }
];

export const INITIAL_DESIGNS: StoneDesign[] = [
  {
    id: 'des-01',
    title: 'Imperial Acanthus 3D Marble Relief',
    category: 'cat-relief',
    imageUrl: '/src/assets/images/stone_design_3d_relief_1792994105139.jpg',
    stoneType: 'Carrara White Marble',
    dimensions: '48" x 60" x 3"',
    carvingDepth: '32mm Sculpted Bas-Relief',
    cutterBit: '4mm Diamond Ball-Nose PCD',
    machiningHours: 28,
    price: 1850,
    unit: 'per crafted panel',
    description: 'Hand-finished multi-layer bas-relief master panel. Cut from single solid block of Italian Carrara marble using 5-axis CNC diamond tooling.',
    features: ['Zero seams single-slab carving', 'Diamond paste hand polish', 'Pre-drilled stainless anchor brackets', 'Architectural lighting ready'],
    inStock: true,
    isCustomizable: true,
    featured: true,
    createdAt: '2026-03-10'
  },
  {
    id: 'des-02',
    title: 'Royal Mughal Lattice Jaali Screen',
    category: 'cat-jaali',
    imageUrl: '/src/assets/images/stone_design_jaali_screen_1792994104562.jpg',
    stoneType: 'Jodhpur Teak Sandstone',
    dimensions: '36" x 84" x 2.5"',
    carvingDepth: 'Through-Perforated 2.5"',
    cutterBit: '6mm End Mill & 45° Chamfer',
    machiningHours: 18,
    price: 1250,
    unit: 'per screen',
    description: 'Bespoke geometric stone lattice that filters sunlight into dramatic shadows. Weatherproof natural sandstone ideal for luxury facades and interior partitions.',
    features: ['High weather & moisture tolerance', 'Beveled edge shadow contours', 'Custom framing available', 'Thermal insulated sandstone'],
    inStock: true,
    isCustomizable: true,
    featured: true,
    createdAt: '2026-03-15'
  },
  {
    id: 'des-03',
    title: 'Sultanate Arabesque Floor Medallion',
    category: 'cat-inlay',
    imageUrl: '/src/assets/images/stone_design_floor_inlay_1792994183891.jpg',
    stoneType: 'Makrana Pure White Marble',
    dimensions: '72" Diameter Circular',
    carvingDepth: '20mm Inset Jointed Flush',
    cutterBit: 'Ultra-Fine 0.8mm Abrasive Waterjet',
    machiningHours: 34,
    price: 3400,
    unit: 'per medallion set',
    description: 'Exquisite circular floor masterpiece combining Makrana White Marble, Nero Marquina Black Granite, and solid brushed brass accents.',
    features: ['Hairline joint gap < 0.2mm', 'Pre-assembled on honeycomb backing', 'Honed or mirror-gloss finish', 'High foot-traffic certified'],
    inStock: true,
    isCustomizable: true,
    featured: true,
    createdAt: '2026-03-20'
  },
  {
    id: 'des-04',
    title: 'Corinthian Fluted Architectural Column',
    category: 'cat-pillars',
    imageUrl: '/src/assets/images/stone_design_marble_pillar_1792994182615.jpg',
    stoneType: 'Carrara White Marble',
    dimensions: '14" Diameter x 108" Height',
    carvingDepth: 'Rotary 4th-Axis Full 360° Fluting',
    cutterBit: '12mm Bullnose Diamond Rotary Mill',
    machiningHours: 42,
    price: 2950,
    unit: 'per column pair',
    description: 'Architectural structural column featuring fluted shaft and classical acanthus leaf capital. Rotary milled on 4-axis lathe attachment.',
    features: ['Hollow core option for steel load column', 'Modular base, shaft and capital', 'High compressive load stone', 'Museum restoration grade'],
    inStock: true,
    isCustomizable: true,
    featured: true,
    createdAt: '2026-03-28'
  },
  {
    id: 'des-05',
    title: 'Executive Crest & Estate Stone Plaque',
    category: 'cat-engraving',
    imageUrl: '/src/assets/images/cnc_tools_cutters_workshop_1792994104382.jpg',
    stoneType: 'Jet Black Granite',
    dimensions: '30" x 20" x 1.5"',
    carvingDepth: '8mm Deep V-Groove Inscription',
    cutterBit: '90° Diamond Tapered V-Carve',
    machiningHours: 6,
    price: 490,
    unit: 'per plaque',
    description: 'Mirror-polished black granite slab engraved with crisp heraldic emblem, Urdu/English calligraphy, and 24K gold leaf guilding.',
    features: ['Zero fading in outdoor sunlight', 'Optional 24K real gold leaf inlay', 'Diamond beveled perimeter edge', 'Invisible rear stud mounting'],
    inStock: true,
    isCustomizable: true,
    featured: false,
    createdAt: '2026-04-02'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'RAS-7821',
    customerName: 'Muhammad Imran Ramzan',
    customerEmail: 'imranmramzan7@gmail.com',
    customerPhone: '+92 300 8472910',
    deliveryAddress: 'House 42, Block D, Phase 5, DHA',
    city: 'Lahore',
    items: [
      {
        designId: 'des-01',
        title: 'Imperial Acanthus 3D Marble Relief',
        stoneType: 'Carrara White Marble',
        dimensions: '48" x 60" x 3"',
        quantity: 1,
        price: 1850,
        imageUrl: '/src/assets/images/stone_design_3d_relief_1792994105139.jpg'
      }
    ],
    totalAmount: 1850,
    depositAmount: 925,
    paymentStatus: 'deposit_paid',
    paymentMethod: 'easypaisa',
    status: 'cnc_carving',
    trackingNumber: 'RAS-PK-982341',
    courier: 'R.A.S Heavy Logistics Flatbed Fleet',
    createdAt: '2026-04-18',
    estimatedDelivery: '2026-05-02',
    adminNotes: 'Spindle #2 allocated. 4mm ball nose bit installed. Carving at 65% completion.',
    timeline: [
      {
        stage: 'Order Confirmed & 3D CAD Verified',
        date: '18 Apr 2026, 11:30 AM',
        completed: true,
        details: 'G-Code toolpath simulation approved by CNC engineer.'
      },
      {
        stage: 'Slab Calibration & Alignment',
        date: '19 Apr 2026, 03:15 PM',
        completed: true,
        details: 'Carrara marble block leveled on vacuum table with water cooling system.'
      },
      {
        stage: '5-Axis CNC Diamond Milling',
        date: '21 Apr 2026, 09:00 AM',
        completed: true,
        details: 'Spindle running at 18,000 RPM. Deep bas-relief carving underway.'
      },
      {
        stage: 'Hand Craft Polishing & Diamond Buffing',
        date: 'Pending (Est. 27 Apr 2026)',
        completed: false,
        details: 'Manual artisan detailing with 3000 grit diamond pads.'
      },
      {
        stage: 'Wooden Crate Packing & Safe Transit',
        date: 'Pending (Est. 01 May 2026)',
        completed: false,
        details: 'Reinforced wood crate with foam suspension for safe stone dispatch.'
      }
    ]
  },
  {
    id: 'RAS-6510',
    customerName: 'Tariq Mehmood Architects',
    customerEmail: 'tariq.architects@gmail.com',
    customerPhone: '+92 321 4455882',
    deliveryAddress: 'Villa 18, Sector B, Bahria Town',
    city: 'Islamabad',
    items: [
      {
        designId: 'des-02',
        title: 'Royal Mughal Lattice Jaali Screen',
        stoneType: 'Jodhpur Teak Sandstone',
        dimensions: '36" x 84" x 2.5"',
        quantity: 2,
        price: 1250,
        imageUrl: '/src/assets/images/stone_design_jaali_screen_1792994104562.jpg'
      }
    ],
    totalAmount: 2500,
    depositAmount: 2500,
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    status: 'dispatched',
    trackingNumber: 'RAS-PK-774102',
    courier: 'TCS Freight Express',
    createdAt: '2026-04-10',
    estimatedDelivery: '2026-04-26',
    adminNotes: 'Wooden armor crating completed. Fragile stone insurance verified.',
    timeline: [
      {
        stage: 'Order Confirmed & 3D CAD Verified',
        date: '10 Apr 2026',
        completed: true,
        details: 'Customer approved geometric perforation pattern.'
      },
      {
        stage: 'Slab Calibration & Alignment',
        date: '12 Apr 2026',
        completed: true,
        details: 'Jodhpur natural teak sandstone clamped.'
      },
      {
        stage: '5-Axis CNC Diamond Milling',
        date: '14 Apr 2026',
        completed: true,
        details: 'Waterjet and milling cut completed without chip out.'
      },
      {
        stage: 'Hand Craft Polishing & Edge Beveling',
        date: '18 Apr 2026',
        completed: true,
        details: 'High durability stone water-repellent sealer applied.'
      },
      {
        stage: 'Wooden Crate Packing & Safe Transit',
        date: '23 Apr 2026',
        completed: true,
        details: 'Dispatched on dedicated air-ride suspension truck.'
      }
    ]
  }
];

export const INITIAL_PROFILE: CustomerProfile = {
  name: 'Muhammad Imran Ramzan',
  phone: '+92 300 8472910',
  email: 'imranmramzan7@gmail.com',
  address: 'House 42, Block D, Phase 5, DHA',
  city: 'Lahore'
};

export const DEFAULT_ADMIN_PASSWORD = 'imraNal1@';

export const INITIAL_SITE_CONTENT = {
  brandTitle: 'R.A.S STONE',
  brandSubtitle: 'CNC Stone Carving & Design Studio',
  heroKicker: '5-Axis Heavy Duty CNC Stone Router & Sculpting Studio',
  heroHeadline: 'Where Ancient Natural Stone Meets 5-Axis Diamond Precision.',
  heroDescription: 'Specialized in high-relief 3D Carrara marble bas-reliefs, geometric sandstone jaali grills, waterjet floor medallions, and monumental architectural pillars carved with sub-millimeter precision.',
  workshopContactPhone: '+92 300 8472910',
  workshopAddress: 'R.A.S Industrial Complex, Plot 42-B, Heavy Stone Zone, Lahore / Karachi',
  easypaisaAccountName: 'MUHAMMAD IMRAN',
  easypaisaAccountNumber: '03702544574'
};

