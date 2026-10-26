import React from 'react';
import { RasLogo } from './RasLogo';
import { ShoppingBag, User, ShieldCheck, LogIn } from 'lucide-react';

interface HeaderProps {
  activeView: 'home' | 'catalog' | 'admin' | 'profile' | 'tracking';
  setActiveView: (view: 'home' | 'catalog' | 'admin' | 'profile' | 'tracking') => void;
  cartCount: number;
  openCart: () => void;
  isAdmin: boolean;
  userEmail: string | null;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  cartCount,
  openCart,
  isAdmin,
  userEmail,
  onOpenAuth
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <button
          onClick={() => setActiveView('home')}
          className="text-left cursor-pointer transition-opacity hover:opacity-90 shrink-0"
        >
          <RasLogo size="md" />
        </button>

        {/* Zone 2: Navigation Links (Admin Studio ONLY appears if isAdmin is true) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveView('home')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
              activeView === 'home'
                ? 'text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Showcase
            {activeView === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveView('catalog')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
              activeView === 'catalog'
                ? 'text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Stone Designs
            {activeView === 'catalog' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveView('tracking')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
              activeView === 'tracking'
                ? 'text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Track Order
            {activeView === 'tracking' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
              activeView === 'profile'
                ? 'text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Customer Profile
            {activeView === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          {/* Admin Studio: STRICTLY ONLY VISIBLE TO AUTHORIZED ADMIN (imranmramzan7@gmail.com) */}
          {isAdmin && (
            <button
              onClick={() => setActiveView('admin')}
              className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors py-1 relative cursor-pointer ${
                activeView === 'admin'
                  ? 'text-amber-400 font-bold'
                  : 'text-amber-500/90 hover:text-amber-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Studio</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-tech font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PRO
              </span>
              {activeView === 'admin' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Actions (Auth State, Profile, Bag) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* User Auth Switcher / Status */}
          {userEmail ? (
            <button
              onClick={onOpenAuth}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-tech transition-colors cursor-pointer border ${
                isAdmin
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-950/70'
                  : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
              title="Click to switch or logout"
            >
              {isAdmin ? (
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <User className="w-3.5 h-3.5 text-stone-400" />
              )}
              <span className="truncate max-w-[110px] sm:max-w-[140px]">{userEmail}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-300 bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Bag */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md shadow-amber-950/40 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-stone-950" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-stone-950 text-amber-400 text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center font-tech">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-800/60 bg-stone-950 px-2 py-2 text-xs font-medium text-stone-400">
        <button
          onClick={() => setActiveView('home')}
          className={`px-2 py-1 ${activeView === 'home' ? 'text-amber-400 font-bold' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveView('catalog')}
          className={`px-2 py-1 ${activeView === 'catalog' ? 'text-amber-400 font-bold' : ''}`}
        >
          Designs
        </button>
        <button
          onClick={() => setActiveView('tracking')}
          className={`px-2 py-1 ${activeView === 'tracking' ? 'text-amber-400 font-bold' : ''}`}
        >
          Tracking
        </button>
        <button
          onClick={() => setActiveView('profile')}
          className={`px-2 py-1 ${activeView === 'profile' ? 'text-amber-400 font-bold' : ''}`}
        >
          Profile
        </button>

        {/* Mobile Admin Link: ONLY IF isAdmin IS TRUE */}
        {isAdmin && (
          <button
            onClick={() => setActiveView('admin')}
            className={`px-2 py-1 flex items-center gap-1 ${activeView === 'admin' ? 'text-amber-400 font-bold' : 'text-amber-500'}`}
          >
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            Admin
          </button>
        )}
      </div>
    </header>
  );
};
