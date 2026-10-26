import React, { useState } from 'react';
import { X, Mail, ShieldCheck, User, LogIn, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string | null;
  adminEmail: string;
  adminPassword: string;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentEmail,
  adminEmail,
  adminPassword,
  onLogin,
  onLogout
}) => {
  if (!isOpen) return null;

  const [inputEmail, setInputEmail] = useState(currentEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isTargetAdmin = inputEmail.trim().toLowerCase() === adminEmail.toLowerCase();

  const handleAdminSelect = () => {
    setInputEmail(adminEmail);
    setPassword('');
    setErrorMessage('');
  };

  const handleCustomerSelect = () => {
    onLogin('customer@gmail.com');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const normalizedEmail = inputEmail.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage('Please enter an email address.');
      return;
    }

    // If logging into the master admin email, check password!
    if (normalizedEmail === adminEmail.toLowerCase()) {
      if (password !== adminPassword) {
        setErrorMessage('Ghalat Password! Baraye meherbani durust admin password darj karein.');
        return;
      }
    }

    onLogin(normalizedEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl p-6 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-stone-800 mb-5">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <LogIn className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-stone-100">
              Account Authentication
            </h3>
            <p className="text-xs text-stone-400">
              Sign in with your Google / Gmail account
            </p>
          </div>
        </div>

        {/* Current Session Badge */}
        {currentEmail && (
          <div className="mb-5 p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-stone-500 font-tech block">Active Session</span>
              <span className="text-xs font-bold text-stone-100 block font-tech truncate max-w-[200px]">
                {currentEmail}
              </span>
              <span className={`text-[10px] font-semibold ${currentEmail === adminEmail.toLowerCase() ? 'text-amber-400' : 'text-stone-400'}`}>
                {currentEmail === adminEmail.toLowerCase() ? '★ Authorized Administrator' : 'Client Account'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onLogout();
                setInputEmail('');
                setPassword('');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/50 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Quick Options */}
        <div className="mb-4 space-y-2">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
            Select Role / Quick Sign In:
          </span>

          <button
            type="button"
            onClick={handleAdminSelect}
            className={`w-full p-3 rounded-xl border text-left transition-colors flex items-center justify-between cursor-pointer ${
              isTargetAdmin
                ? 'bg-amber-950/40 border-amber-500 text-stone-100'
                : 'bg-stone-950 border-stone-800 hover:bg-stone-800/80 text-stone-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-xs font-bold block">Sign In as Admin</span>
                <span className="text-[11px] font-tech text-amber-300">{adminEmail}</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400 text-stone-950 font-bold">
              Password Protected
            </span>
          </button>

          <button
            type="button"
            onClick={handleCustomerSelect}
            className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 hover:bg-stone-800 text-left transition-colors flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-stone-400" />
              <div>
                <span className="text-xs font-semibold text-stone-200 block">Sign In as Regular Client</span>
                <span className="text-[11px] font-tech text-stone-400">customer@gmail.com</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400">
              No Password Needed
            </span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form with Password for Admin */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-2 border-t border-stone-800">
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Gmail Address:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="yourname@gmail.com"
                value={inputEmail}
                onChange={(e) => {
                  setInputEmail(e.target.value);
                  setErrorMessage('');
                }}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs font-tech focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Password Input (Required when logging in as Admin) */}
          {isTargetAdmin && (
            <div className="p-3 rounded-xl bg-stone-950 border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  Admin Password *
                </label>
                <span className="text-[10px] font-tech text-stone-400">
                  Default: <code className="text-amber-400">imraNal1@</code>
                </span>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter admin password (imraNal1@)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full pr-10 pl-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs font-tech focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isTargetAdmin ? 'Authenticate as Admin' : 'Sign In as Client'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
