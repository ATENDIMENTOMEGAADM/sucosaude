import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useLanguage, Language } from '../i18n';
import { loginWithGoogle, logout } from '../firebase';
import { Activity, BookOpen, PlusCircle, MessageCircle, LogOut, Globe, AlertTriangle, BookText, Eye } from 'lucide-react';
import { DisclaimerModal } from './DisclaimerModal';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4 relative">
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          <Globe className="w-4 h-4 text-gray-600" />
          <select 
            value={language} 
            onChange={handleLanguageChange}
            className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="pt">Português</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('app.title')}</h1>
          <p className="text-gray-600 mb-8">{t('app.subtitle')}</p>
          <button
            onClick={async () => {
              setAuthError(null);
              const err = await loginWithGoogle();
              if (err) setAuthError(err);
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {t('auth.signin')}
          </button>
          {authError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-xs font-mono text-red-700 break-all">{authError}</p>
            </div>
          )}
        </div>
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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <DisclaimerModal isOpen={showDisclaimer} onClose={handleCloseDisclaimer} />
      
      {/* Sidebar / Bottom Nav */}
      <nav className="bg-white border-r border-gray-200 w-full md:w-64 flex-shrink-0 fixed bottom-0 md:relative z-10 md:h-screen flex flex-row md:flex-col justify-between md:justify-start shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none">
        <div className="p-4 hidden md:flex items-center gap-3 border-b border-gray-100">
          <div className="bg-green-100 p-2 rounded-lg">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <span className="font-bold text-xl text-gray-900">SucoSaúde</span>
        </div>
        
        <div className="flex flex-row md:flex-col w-full p-2 md:p-4 gap-1 md:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 md:flex-none flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:p-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : ''}`} />
                <span className="text-[10px] md:text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:block mt-auto p-4 border-t border-gray-100">
          <button
            onClick={() => setShowDisclaimer(true)}
            className="w-full flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors p-2 rounded-lg hover:bg-amber-50 mb-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">{t('disclaimer.title')}</span>
          </button>

          <div className="flex items-center gap-2 mb-6 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <Globe className="w-4 h-4 text-gray-500" />
            <select 
              value={language} 
              onChange={handleLanguageChange}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer w-full"
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <img 
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
              alt="Profile" 
              className="w-10 h-10 rounded-full"
              referrerPolicy="no-referrer"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">{t('auth.logout')}</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="md:hidden bg-white p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-600" />
            <span className="font-bold text-lg text-gray-900">SucoSaúde</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowDisclaimer(true)} className="text-amber-600 hover:text-amber-700">
              <AlertTriangle className="w-5 h-5" />
            </button>
            <select 
              value={language} 
              onChange={handleLanguageChange}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="pt">PT</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
            <button onClick={logout} className="text-gray-500 hover:text-red-600">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
