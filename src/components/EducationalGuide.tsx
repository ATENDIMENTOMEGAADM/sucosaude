import React from 'react';
import { useLanguage } from '../i18n';
import { BookText, Droplet, Heart, Leaf, Info } from 'lucide-react';

export const EducationalGuide: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-8 -translate-y-8">
          <BookText className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <BookText className="w-6 h-6 text-white" />
            </div>
            <span className="font-medium text-green-50 uppercase tracking-wider text-sm">
              {t('nav.guide')}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {t('guide.title')}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
            <Droplet className="w-6 h-6" />
          </div>
          <p className="text-gray-700 leading-relaxed text-justify">{t('guide.p1')}</p>
          <p className="text-gray-700 leading-relaxed text-justify">{t('guide.p2')}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4">
            <Info className="w-6 h-6" />
          </div>
          <p className="text-gray-700 leading-relaxed text-justify">{t('guide.p3')}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
            <Leaf className="w-6 h-6" />
          </div>
          <p className="text-gray-700 leading-relaxed text-justify">{t('guide.p4')}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <p className="text-gray-700 leading-relaxed text-justify">{t('guide.p5')}</p>
          <div className="pt-4 border-t border-gray-100 mt-4">
            <p className="text-gray-900 font-medium italic text-justify">{t('guide.p6')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
