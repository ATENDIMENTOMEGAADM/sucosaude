import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useLanguage, Language } from '../i18n';
import { loginWithGoogle, logout } from '../firebase';
import { Activity, BookOpen, PlusCircle, MessageCircle, LogOut, Globe, AlertTriangle, BookText, Eye } from 'lucide-react';
import { DisclaimerModal } from './DisclaimerModal';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { user, isAuthReady } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const hasSeenDisclaimer = localStorage.getItem('juicehealth_disclaimer_seen');
      if (!hasSeenDisclaimer) {
        setShowDisclaimer(true);
      }
    }
  }, [user]);

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem('juicehealth_disclaimer_seen', 'true');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium tracking-wide">SucoSaúde</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(5,150,105,0.12)_0%,transparent_50%)]" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Language selector */}
        <div className="absolute top-6 right-6 z-10">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 shadow-lg">
            <Globe className="w-4 h-4 text-green-400" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-transparent text-sm font-medium text-white outline-none cursor-pointer"
            >
              <option value="en" className="text-slate-900">English</option>
              <option value="pt" className="text-slate-900">Português</option>
              <option value="es" className="text-slate-900">Español</option>
              <option value="fr" className="text-slate-900">Français</option>
            </select>
          </div>
        </div>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/40">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
                className="relative mb-4"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl opacity-20 blur-md" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="text-3xl font-bold text-white mb-1"
              >
                {t('app.title')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="text-slate-300 text-center text-sm leading-relaxed max-w-xs"
              >
                {t('app.subtitle')}
              </motion.p>
            </div>

            {/* Sign in button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                setAuthError(null);
                const err = await loginWithGoogle();
                if (err) setAuthError(err);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-green-500/25"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" fillOpacity="0.9" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" fillOpacity="0.7" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white" fillOpacity="0.5" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" fillOpacity="0.8" />
              </svg>
              {t('auth.signin')}
            </motion.button>

            <AnimatePresence>
              {authError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl overflow-hidden"
                >
                  <p className="text-xs font-mono text-red-300 break-all">{authError}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Activity },
    { id: 'recipes', label: t('nav.recipes'), icon: BookOpen },
    { id: 'custom', label: t('nav.custom'), icon: PlusCircle },
    { id: 'consult', label: t('nav.consult'), icon: MessageCircle },
    { id: 'guide', label: t('nav.guide'), icon: BookText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <DisclaimerModal isOpen={showDisclaimer} onClose={handleCloseDisclaimer} />

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 flex-shrink-0 fixed h-screen bg-slate-900 border-r border-slate-800 z-20 shadow-2xl shadow-black/20">
        {/* Logo area */}
        <div className="p-5 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl opacity-20 blur-sm" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight leading-none">SucoSaúde</span>
              <p className="text-xs text-slate-500 mt-0.5">Eye Health Tracker</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/10 text-green-400'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-r-full" />
                )}
                <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-green-500/20 shadow-sm shadow-green-500/20'
                    : 'group-hover:bg-white/10'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shadow-sm shadow-green-400/60" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="p-3 border-t border-slate-800/60 space-y-1">
          <button
            onClick={() => setShowDisclaimer(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-200"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">{t('disclaimer.title')}</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-slate-700/50">
            <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-transparent text-sm font-medium text-slate-300 outline-none cursor-pointer w-full"
            >
              <option value="en" className="text-slate-900 bg-white">English</option>
              <option value="pt" className="text-slate-900 bg-white">Português</option>
              <option value="es" className="text-slate-900 bg-white">Español</option>
              <option value="fr" className="text-slate-900 bg-white">Français</option>
            </select>
          </div>

          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-slate-700/50">
            <div className="relative flex-shrink-0">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
                alt="Profile"
                className="w-9 h-9 rounded-full ring-2 ring-green-500/50 ring-offset-1 ring-offset-slate-900"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900" />
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-tight">{user.displayName}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">{t('auth.logout')}</span>
          </button>
        </div>
      </nav>

      {/* Mobile top bar */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-black/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">SucoSaúde</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowDisclaimer(true)}
            className="p-2 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-slate-800 text-xs font-semibold text-slate-300 outline-none cursor-pointer px-2 py-1.5 rounded-lg border border-slate-700"
          >
            <option value="en">EN</option>
            <option value="pt">PT</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
          <button
            onClick={logout}
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? 'text-green-400' : 'text-slate-500'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-green-500/20' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-semibold">{item.label}</span>
                {isActive && <div className="w-1 h-1 rounded-full bg-green-400" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 md:ml-64 overflow-y-auto pb-24 md:pb-0 min-h-screen bg-slate-50">
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
