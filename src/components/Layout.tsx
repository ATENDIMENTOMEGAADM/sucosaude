import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthProvider';
import { useLanguage, Language } from '../i18n';
import { loginWithGoogle, logout } from '../firebase';
import { Activity, BookOpen, PlusCircle, MessageCircle, LogOut, AlertTriangle, BookText, Eye, ChevronDown, Check, Wand2 } from 'lucide-react';
import { DisclaimerModal } from './DisclaimerModal';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const LANGUAGES: { code: Language; label: string; native: string; flag: string }[] = [
  { code: 'pt', label: 'Português', native: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English',   native: 'English',   flag: '🇺🇸' },
  { code: 'es', label: 'Español',   native: 'Español',   flag: '🇪🇸' },
  { code: 'fr', label: 'Français',  native: 'Français',  flag: '🇫🇷' },
];

function LanguagePicker({ dark = false }: { dark?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find(l => l.code === language) ?? LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          dark
            ? 'bg-white/5 border border-slate-700/60 text-slate-300 hover:bg-white/10 hover:border-slate-600'
            : 'bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white/25'
        }`}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.native}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-44 bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50"
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                  language === lang.code
                    ? 'bg-green-500/15 text-green-400'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="font-medium flex-1 text-left">{lang.native}</span>
                {language === lang.code && <Check className="w-3.5 h-3.5 text-green-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { user, isAuthReady } = useAuth();
  const { t } = useLanguage();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const hasSeenDisclaimer = localStorage.getItem('juicehealth_disclaimer_seen');
      if (!hasSeenDisclaimer) setShowDisclaimer(true);
    }
  }, [user]);

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem('juicehealth_disclaimer_seen', 'true');
  };

  /* ── Loading ── */
  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-white font-semibold tracking-wide">SucoSaúde</p>
            <p className="text-slate-500 text-xs mt-1">Eye Health Tracker</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Login ── */
  if (!user) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-slate-950">
        {/* Ambient glow layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.18)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-green-400/5 rounded-full blur-3xl" />

        {/* Grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">SucoSaúde</span>
          </div>
          <LanguagePicker />
        </div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 flex flex-wrap justify-center gap-2 mb-8 px-4"
        >
          {['👁️ Saúde Ocular', '🥤 Receitas de Sucos', '🤖 IA Consultiva', '📊 Rastreamento'].map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="text-xs font-medium text-slate-400 bg-white/5 border border-slate-700/50 px-3 py-1.5 rounded-full backdrop-blur-sm"
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-sm mx-4"
        >
          {/* Card glow */}
          <div className="absolute -inset-px bg-gradient-to-br from-green-500/30 via-transparent to-emerald-500/20 rounded-3xl blur-sm" />

          <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl shadow-black/60">
            {/* Logo */}
            <div className="flex flex-col items-center mb-7">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5, type: 'spring', stiffness: 220, damping: 16 }}
                className="relative mb-5"
              >
                <div className="absolute -inset-3 bg-green-500/15 rounded-3xl blur-xl" />
                <div className="relative w-18 h-18 w-[4.5rem] h-[4.5rem] rounded-2xl bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-green-500/30">
                  <Activity className="w-9 h-9 text-white drop-shadow-sm" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="text-2xl font-bold text-white tracking-tight mb-1"
              >
                {t('app.title')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46 }}
                className="text-slate-400 text-sm text-center leading-relaxed max-w-[22ch]"
              >
                {t('app.subtitle')}
              </motion.p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              <span className="text-xs text-slate-600 font-medium">Entrar com</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            </div>

            {/* Sign in button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 }}
              whileHover={{ scale: 1.025, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.975 }}
              onClick={async () => {
                setAuthError(null);
                const err = await loginWithGoogle();
                if (err) setAuthError(err);
              }}
              className="relative w-full group overflow-hidden bg-white hover:bg-slate-50 text-slate-800 font-semibold py-3 px-5 rounded-2xl transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('auth.signin')}
            </motion.button>

            <AnimatePresence>
              {authError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3 bg-red-500/15 border border-red-500/25 rounded-xl overflow-hidden"
                >
                  <p className="text-xs font-mono text-red-400 break-all">{authError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-xs text-slate-600 mt-5 leading-relaxed">
              Ao entrar, você concorda com os<br />
              <button onClick={() => setShowDisclaimer(true)} className="text-green-500 hover:text-green-400 underline underline-offset-2 transition-colors">
                termos de uso e aviso médico
              </button>
            </p>
          </div>
        </motion.div>

        <DisclaimerModal isOpen={showDisclaimer} onClose={handleCloseDisclaimer} />
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard',  label: t('nav.dashboard'), icon: Activity },
    { id: 'recipes',    label: t('nav.recipes'),   icon: BookOpen },
    { id: 'generator',  label: 'Gerador IA',       icon: Wand2 },
    { id: 'custom',     label: t('nav.custom'),    icon: PlusCircle },
    { id: 'consult',    label: t('nav.consult'),   icon: MessageCircle },
    { id: 'guide',      label: t('nav.guide'),     icon: BookText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <DisclaimerModal isOpen={showDisclaimer} onClose={handleCloseDisclaimer} />

      {/* ── Desktop Sidebar ── */}
      <nav className="hidden md:flex flex-col w-64 flex-shrink-0 fixed h-screen bg-slate-950 border-r border-slate-800/60 z-20">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl opacity-25 blur-sm" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                <Activity className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="font-bold text-white text-[15px] leading-tight tracking-tight">SucoSaúde</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5 tracking-wide uppercase">Eye Health Tracker</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-2">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/5 text-green-400'
                    : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-green-400 to-emerald-500 rounded-r-full" />
                )}
                <span className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-green-500/20 text-green-400' : 'group-hover:bg-white/8 text-slate-500 group-hover:text-slate-300'}`}>
                  <Icon className="w-4 h-4" />
                </span>
                {item.label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shadow-sm shadow-green-400/60 animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-slate-800/60 space-y-1">
          <button
            onClick={() => setShowDisclaimer(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-amber-500/70 hover:text-amber-400 hover:bg-amber-500/8 transition-all text-sm font-medium"
          >
            <AlertTriangle className="w-4 h-4" />
            {t('disclaimer.title')}
          </button>

          {/* Language picker */}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs text-slate-600 font-medium">Idioma</span>
            <LanguagePicker dark />
          </div>

          {/* User */}
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/3 border border-slate-800/60 mt-1">
            <div className="relative flex-shrink-0">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=16a34a&color=fff`}
                alt="Profile"
                className="w-8 h-8 rounded-full ring-2 ring-green-500/40 ring-offset-1 ring-offset-slate-950 object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-950" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white truncate leading-tight">{user.displayName}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/8 transition-all text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            {t('auth.logout')}
          </button>
        </div>
      </nav>

      {/* ── Mobile Top Bar ── */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800/60 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-black/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-[15px] tracking-tight">SucoSaúde</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguagePicker />
          <button onClick={() => setShowDisclaimer(true)} className="p-2 rounded-lg text-amber-400/70 hover:bg-amber-500/10 transition-colors">
            <AlertTriangle className="w-4 h-4" />
          </button>
          <button onClick={logout} className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/60 px-1 py-1.5">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[52px] ${
                  isActive ? 'text-green-400' : 'text-slate-600'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-green-500/20 shadow-sm shadow-green-500/20' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-semibold leading-none">{item.label}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-green-400 mt-0.5" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="flex-1 md:ml-64 overflow-y-auto pb-24 md:pb-0 min-h-screen bg-slate-50">
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
