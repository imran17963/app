import React, { useState, useEffect } from 'react';
import { 
  Category, CustomerProfile, Order, OrderItem, 
  OrderStage, QuoteRequest, SiteContent, StoneDesign 
} from './types/stone';
import { 
  INITIAL_CATEGORIES, INITIAL_DESIGNS, 
  INITIAL_ORDERS, INITIAL_PROFILE,
  DEFAULT_ADMIN_PASSWORD, INITIAL_SITE_CONTENT
} from './data/initialData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { AdminPanel } from './components/AdminPanel';
import { UserProfile } from './components/UserProfile';
import { OrderTrackingView } from './components/OrderTrackingView';
import { DesignDetailModal } from './components/DesignDetailModal';
import { CategoryModal } from './components/CategoryModal';
import { DesignModal } from './components/DesignModal';
import { PaymentModal } from './components/PaymentModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

export default function App() {
  // Navigation State
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'admin' | 'profile' | 'tracking'>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Master Admin Email Configuration (Default: imranmramzan7@gmail.com)
  const DEFAULT_ADMIN_EMAIL = 'imranmramzan7@gmail.com';
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('ras_admin_email') || DEFAULT_ADMIN_EMAIL;
    } catch {
      return DEFAULT_ADMIN_EMAIL;
    }
  });

  // Admin Password Configuration (Default: imraNal1@)
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('ras_admin_password') || DEFAULT_ADMIN_PASSWORD;
    } catch {
      return DEFAULT_ADMIN_PASSWORD;
    }
  });

  // Dynamic Site Texts & Content Configuration (Editable by Admin)
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('ras_site_content');
      return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT;
    } catch {
      return INITIAL_SITE_CONTENT;
    }
  });

  // Current Logged-in User Session (Default logged in as imranmramzan7@gmail.com)
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('ras_user_email') || 'imranmramzan7@gmail.com';
    } catch {
      return 'imranmramzan7@gmail.com';
    }
  });

  // Role calculation: User is ONLY admin if their email exactly matches the configured master admin email
  const isAdmin = Boolean(
    currentUserEmail && currentUserEmail.toLowerCase() === adminEmail.toLowerCase()
  );

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Core Data States with localStorage persistence
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('ras_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [designs, setDesigns] = useState<StoneDesign[]>(() => {
    try {
      const saved = localStorage.getItem('ras_designs');
      return saved ? JSON.parse(saved) : INITIAL_DESIGNS;
    } catch {
      return INITIAL_DESIGNS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ras_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [profile, setProfile] = useState<CustomerProfile>(() => {
    try {
      const saved = localStorage.getItem('ras_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [cart, setCart] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('ras_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ras_admin_email', adminEmail);
    } catch (e) {
      console.error(e);
    }
  }, [adminEmail]);

  useEffect(() => {
    try {
      localStorage.setItem('ras_admin_password', adminPassword);
    } catch (e) {
      console.error(e);
    }
  }, [adminPassword]);

  useEffect(() => {
    try {
      localStorage.setItem('ras_site_content', JSON.stringify(siteContent));
    } catch (e) {
      console.error(e);
    }
  }, [siteContent]);

  useEffect(() => {
    try {
      if (currentUserEmail) {
        localStorage.setItem('ras_user_email', currentUserEmail);
      } else {
        localStorage.removeItem('ras_user_email');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUserEmail]);

  useEffect(() => {
    try {
      localStorage.setItem('ras_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('ras_designs', JSON.stringify(designs));
    } catch (e) {
      console.error(e);
    }
  }, [designs]);

  useEffect(() => {
    try {
      localStorage.setItem('ras_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ras_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('ras_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Auth Operations
  const handleLogin = (email: string) => {
    setCurrentUserEmail(email);
    if (email.toLowerCase() !== adminEmail.toLowerCase() && activeView === 'admin') {
      setActiveView('home');
    }
  };

  const handleLogout = () => {
    setCurrentUserEmail(null);
    if (activeView === 'admin') {
      setActiveView('home');
    }
  };

  const handleChangeAdminEmail = (newEmail: string) => {
    setAdminEmail(newEmail);
  };

  const handleChangeAdminPassword = (newPassword: string) => {
    setAdminPassword(newPassword);
  };

  const handleUpdateSiteContent = (newContent: SiteContent) => {
    setSiteContent(newContent);
  };

  // Modal Visibility States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedDesignForDetail, setSelectedDesignForDetail] = useState<StoneDesign | null>(null);
  
  // Admin modals
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<StoneDesign | null>(null);

  // Cart operations
  const handleAddToCart = (
    design: StoneDesign,
    customOptions?: { dimensions: string; finish: string; customPrice: number }
  ) => {
    const itemPrice = customOptions ? customOptions.customPrice : design.price;
    const itemDims = customOptions ? customOptions.dimensions : design.dimensions;

    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.designId === design.id && item.dimensions === itemDims
      );
      if (existing) {
        return prevCart.map((item) =>
          item.designId === design.id && item.dimensions === itemDims
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          designId: design.id,
          title: customOptions ? `${design.title} (${customOptions.finish})` : design.title,
          stoneType: design.stoneType,
          dimensions: itemDims,
          quantity: 1,
          price: itemPrice,
          imageUrl: design.imageUrl
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (designId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.designId === designId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is OrderItem => item !== null)
    );
  };

  const handleRemoveCartItem = (designId: string) => {
    setCart((prev) => prev.filter((item) => item.designId !== designId));
  };

  // Category CRUD
  const handleSaveCategory = (cat: Category) => {
    setCategories((prev) => {
      const exists = prev.some((c) => c.id === cat.id);
      if (exists) {
        return prev.map((c) => (c.id === cat.id ? cat : c));
      }
      return [...prev, cat];
    });
    setEditingCategory(null);
  };

  const handleDeleteCategory = (catId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    if (selectedCategoryId === catId) {
      setSelectedCategoryId(null);
    }
  };

  // Design CRUD
  const handleSaveDesign = (design: StoneDesign) => {
    setDesigns((prev) => {
      const exists = prev.some((d) => d.id === design.id);
      if (exists) {
        return prev.map((d) => (d.id === design.id ? design : d));
      }
      return [design, ...prev];
    });
    setEditingDesign(null);
  };

  const handleDeleteDesign = (id: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
  };

  // Order Management
  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: OrderStage,
    tracking?: string,
    notes?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const nowStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
          const stageIndexMap: Record<OrderStage, number> = {
            confirmed: 0,
            cnc_programming: 1,
            cnc_carving: 2,
            diamond_polishing: 3,
            quality_passed: 4,
            dispatched: 4,
            delivered: 4
          };
          const targetIndex = stageIndexMap[newStatus] ?? 0;

          const updatedTimeline = order.timeline.map((step, idx) => ({
            ...step,
            completed: idx <= targetIndex,
            date: idx <= targetIndex && !step.completed ? nowStr : step.date
          }));

          return {
            ...order,
            status: newStatus,
            trackingNumber: tracking !== undefined ? tracking : order.trackingNumber,
            adminNotes: notes !== undefined ? notes : order.adminNotes,
            timeline: updatedTimeline
          };
        }
        return order;
      })
    );
  };

  const handlePaymentSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  const handleQuoteSubmit = (quote: QuoteRequest) => {
    console.log('New Quote Request:', quote);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 3-Zone Navigation Top Bar (Admin Studio ONLY appears if isAdmin is true) */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        userEmail={currentUserEmail}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div>
            <Hero
              onExploreCatalog={() => {
                setActiveView('catalog');
                setSelectedCategoryId(null);
              }}
              onTrackOrder={() => setActiveView('tracking')}
              onRequestQuote={() => setActiveView('profile')}
              siteContent={siteContent}
            />

            {/* Featured Stone Art Portfolio Showcase */}
            <div className="py-12 bg-stone-950">
              <Catalog
                designs={designs}
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={(id) => setSelectedCategoryId(id)}
                onOpenDesignDetail={(design) => setSelectedDesignForDetail(design)}
                onAddToCart={(design) => handleAddToCart(design)}
                onOpenAddCategoryModal={() => {
                  setEditingCategory(null);
                  setIsCategoryModalOpen(true);
                }}
                onOpenAddDesignModal={() => {
                  setEditingDesign(null);
                  setIsDesignModalOpen(true);
                }}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        )}

        {activeView === 'catalog' && (
          <div className="py-6">
            <Catalog
              designs={designs}
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={(id) => setSelectedCategoryId(id)}
              onOpenDesignDetail={(design) => setSelectedDesignForDetail(design)}
              onAddToCart={(design) => handleAddToCart(design)}
              onOpenAddCategoryModal={() => {
                setEditingCategory(null);
                setIsCategoryModalOpen(true);
              }}
              onOpenAddDesignModal={() => {
                setEditingDesign(null);
                setIsDesignModalOpen(true);
              }}
              isAdmin={isAdmin}
            />
          </div>
        )}

        {activeView === 'admin' && (
          <AdminPanel
            designs={designs}
            categories={categories}
            orders={orders}
            onAddNewDesign={() => {
              setEditingDesign(null);
              setIsDesignModalOpen(true);
            }}
            onEditDesign={(design) => {
              setEditingDesign(design);
              setIsDesignModalOpen(true);
            }}
            onDeleteDesign={handleDeleteDesign}
            onAddNewCategory={() => {
              setEditingCategory(null);
              setIsCategoryModalOpen(true);
            }}
            onEditCategory={(cat) => {
              setEditingCategory(cat);
              setIsCategoryModalOpen(true);
            }}
            onDeleteCategory={handleDeleteCategory}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onViewDesign={(design) => setSelectedDesignForDetail(design)}
            isAdmin={isAdmin}
            adminEmail={adminEmail}
            adminPassword={adminPassword}
            currentEmail={currentUserEmail}
            onChangeAdminEmail={handleChangeAdminEmail}
            onChangeAdminPassword={handleChangeAdminPassword}
            siteContent={siteContent}
            onUpdateSiteContent={handleUpdateSiteContent}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeView === 'profile' && (
          <UserProfile
            profile={profile}
            orders={orders}
            onUpdateProfile={(updated) => setProfile(updated)}
            onSubmitQuote={handleQuoteSubmit}
            onSelectOrderForTracking={(orderId) => {
              setActiveView('tracking');
            }}
          />
        )}

        {activeView === 'tracking' && (
          <OrderTrackingView
            orders={orders}
            onOpenCatalog={() => setActiveView('catalog')}
          />
        )}
      </main>

      {/* Footer with dynamic site texts */}
      <Footer
        onNavigate={(view) => setActiveView(view)}
        isAdmin={isAdmin}
        siteContent={siteContent}
      />

      {/* MODALS */}
      {/* Google / Gmail Auth Modal with Password Verification */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentEmail={currentUserEmail}
        adminEmail={adminEmail}
        adminPassword={adminPassword}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Design Detail Modal */}
      <DesignDetailModal
        design={selectedDesignForDetail}
        onClose={() => setSelectedDesignForDetail(null)}
        onAddToCart={(design, customOptions) => handleAddToCart(design, customOptions)}
      />

      {/* Category Add/Edit Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSaveCategory={handleSaveCategory}
        existingCategory={editingCategory}
      />

      {/* Design Add/Edit Modal with Photo Upload */}
      <DesignModal
        isOpen={isDesignModalOpen}
        onClose={() => {
          setIsDesignModalOpen(false);
          setEditingDesign(null);
        }}
        onSaveDesign={handleSaveDesign}
        categories={categories}
        existingDesign={editingDesign}
      />

      {/* Easypaisa Payment Gateway Modal with dynamic account details */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => {
          setIsPaymentOpen(false);
          setActiveView('profile');
        }}
        cartItems={cart}
        profile={profile}
        onPaymentSuccess={handlePaymentSuccess}
        siteContent={siteContent}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsPaymentOpen(true)}
      />

    </div>
  );
}
