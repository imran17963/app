import React from 'react';
import { RasLogo } from './RasLogo';
import { Phone, Mail, MapPin, ShieldCheck, Compass } from 'lucide-react';
import { SiteContent } from '../types/stone';
import { INITIAL_SITE_CONTENT } from '../data/initialData';

interface FooterProps {
  onNavigate: (view: 'home' | 'catalog' | 'admin' | 'profile' | 'tracking') => void;
  isAdmin?: boolean;
  siteContent?: SiteContent;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  isAdmin = false,
  siteContent = INITIAL_SITE_CONTENT 
}) => {
  return (
    <footer className="w-full border-t border-stone-800 bg-stone-950 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Craftsmanship */}
          <div className="space-y-4">
            <RasLogo size="md" />
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Premier 5-axis CNC stone routing studio specializing in 3D Carrara marble wall panels, sandstone jaali lattices, waterjet floor medallions, and architectural column masonry.
            </p>
            <div className="flex items-center gap-2 text-xs font-tech text-amber-400">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>±0.02mm Precision Milling Tolerances</span>
            </div>
          </div>

          {/* Col 2: Architectural Collections */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-stone-100 uppercase tracking-wider">
              Stone Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  3D Bas-Relief Marble Wall Art
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Perforated Sandstone Jaali Grills
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Waterjet Medallion Floor Inlays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Corinthian Columns & Carved Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Deep V-Carve Granite Nameplates
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Client & Production Portals */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-stone-100 uppercase tracking-wider">
              Client & Studio
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('tracking')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Live CNC Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Client Profile & Blueprints
                </button>
              </li>
              {isAdmin && (
                <li>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Admin Studio & Design Uploader</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Custom CAD / STL Quote Request
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Workshop & Stone Yard */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-stone-100 uppercase tracking-wider">
              Studio & Factory
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{siteContent.workshopAddress}</span>
              </div>
              <div className="flex items-center gap-2 font-tech">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-stone-200">{siteContent.workshopContactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-stone-200">imranmramzan7@gmail.com</span>
              </div>
              <div className="pt-2 text-[11px] text-stone-500">
                Packaging: Certified Shock-Suspension Wooden Armor Crates
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} R.A.S STONE. All Rights Reserved. Precision Architectural CNC Stonework.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Carrara Marble</span>
            <span>·</span>
            <span>Black Granite</span>
            <span>·</span>
            <span>Sandstone</span>
            <span>·</span>
            <span className="text-amber-400 font-tech">5-Axis CNC Routers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
