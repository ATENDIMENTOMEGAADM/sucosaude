import React from 'react';
import { useLanguage } from '../i18n';
import { BookText, Droplet, Heart, Leaf, Info, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export const EducationalGuide: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      id: 'hydration',
      icon: Droplet,
      title: t('guide.p1').slice(0, 40).split(' ').slice(0, 4).join(' '),
      paragraphs: [t('guide.p1'), t('guide.p2')],
      topGradient: 'from-cyan-400 to-blue-500',
      iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      accentColor: 'text-blue-600',
      borderColor: 'border-blue-100',
      sectionLabel: 'Hidratação',
      quote: null,
    },
    {
      id: 'nutrients',
      icon: Info,
      title: t('guide.p3').slice(0, 40).split(' ').slice(0, 4).join(' '),
      paragraphs: [t('guide.p3')],
      topGradient: 'from-amber-400 to-orange-500',
      iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
      accentColor: 'text-amber-600',
      borderColor: 'border-amber-100',
      sectionLabel: 'Nutrientes',
      quote: null,
    },
    {
      id: 'natural',
      icon: Leaf,
      title: t('guide.p4').slice(0, 40).split(' ').slice(0, 4).join(' '),
      paragraphs: [t('guide.p4')],
      topGradient: 'from-emerald-400 to-green-600',
      iconBg: 'bg-gradient-to-br from-emerald-400 to-green-600',
      accentColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
      sectionLabel: 'Ingredientes Naturais',
      quote: null,
    },
    {
      id: 'wellness',
      icon: Heart,
      title: t('guide.p5').slice(0, 40).split(' ').slice(0, 4).join(' '),
      paragraphs: [t('guide.p5')],
      topGradient: 'from-rose-400 to-pink-600',
      iconBg: 'bg-gradient-to-br from-rose-400 to-pink-600',
      accentColor: 'text-rose-600',
      borderColor: 'border-rose-100',
      sectionLabel: 'Bem-estar',
      quote: t('guide.p6'),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl shadow-green-600/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
        <div className="absolute top-0 right-0 opacity-10 translate-x-8 -translate-y-8 pointer-events-none">
          <BookText className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
              <BookText className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-green-100/80 uppercase tracking-wider text-xs">
              {t('nav.guide')}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {t('guide.title')}
          </h1>
        </div>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-white rounded-2xl shadow-sm border ${card.borderColor} overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300`}
            >
              {/* Colored top gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${card.topGradient}`} />

              <div className="p-6 flex-1 flex flex-col gap-4">
                {/* Header row */}
                <div className="flex items-start gap-4">
                  <div className={`${card.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${card.accentColor}`}>
                      {card.sectionLabel}
                    </span>
                    <h2 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                      {card.title}…
                    </h2>
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px bg-gradient-to-r ${card.topGradient} opacity-20`} />

                {/* Paragraphs */}
                <div className="space-y-3 flex-1">
                  {card.paragraphs.map((para, idx) => (
                    <p key={idx} className="text-slate-600 leading-relaxed text-sm text-justify">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Quote callout */}
                {card.quote && (
                  <div className={`mt-2 flex gap-3 p-4 rounded-xl bg-rose-50 border-l-4 border-rose-400`}>
                    <Quote className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-slate-700 italic leading-relaxed text-justify">
                      {card.quote}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
