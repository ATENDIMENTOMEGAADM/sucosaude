import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { Search, Filter, Eye, Leaf, Clock, ChefHat, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface RecipeLibraryProps {
  onSelectRecipe: (recipeId: string) => void;
  onNavigate: (tab: string) => void;
}

export const RecipeLibrary: React.FC<RecipeLibraryProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const themeCards = [
    {
      id: 'vision',
      title: t('vision.title'),
      theme: 'Bebidas para os olhos',
      description: 'Descubra sucos e vitaminas ricos em antioxidantes, luteína e zeaxantina para proteger sua visão e prevenir o envelhecimento ocular.',
      img: '/juices.png',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
      keywords: ['olhos', 'visão', 'vision', 'eyes', 'bebidas para os olhos'],
      prepTime: '10 min',
      difficulty: 'Fácil',
      benefits: ['Rico em Vitamina A', 'Antioxidantes']
    }
  ];

  const filters = [
    { id: 'all', label: 'Todos os Temas' },
    { id: 'Bebidas para os olhos', label: 'Bebidas para os olhos' }
  ];

  const filteredCards = themeCards.filter(card => {
    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = selectedFilter === 'all' || card.theme === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-2"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('recipes.title')}
        </h1>
        <p className="text-base text-slate-500 mt-2 max-w-2xl">{t('recipes.subtitle')}</p>
      </motion.header>

      {/* Search and filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder={t('recipes.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 border-none rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all"
          />
        </div>

        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="block w-full pl-11 pr-10 py-3 border-none rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm appearance-none cursor-pointer font-medium transition-all"
          >
            {filters.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Cards grid */}
      {filteredCards.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-4">
            <Leaf className="h-9 w-9 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">{t('recipes.noRecipes')}</h3>
          <p className="text-slate-400 mt-2 text-sm">{t('recipes.adjustSearch')}</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => onNavigate(card.id)}
              className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100 overflow-hidden cursor-pointer flex flex-col group hover:shadow-xl hover:shadow-green-100/60 transition-shadow duration-300"
            >
              {/* Image section - full height cover */}
              <div className="h-72 overflow-hidden relative flex-shrink-0">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient overlay from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Top-right icon badge - animates on hover */}
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-lg"
                >
                  <div className={card.textColor}>{card.icon}</div>
                </motion.div>
                {/* Theme label */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 uppercase tracking-wider">
                    {card.theme}
                  </span>
                </div>
                {/* Stats row overlaid on image bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-white/20">
                    <Clock className="w-3.5 h-3.5 text-orange-300" />
                    {card.prepTime}
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-white/20">
                    <ChefHat className="w-3.5 h-3.5 text-blue-300" />
                    {card.difficulty}
                  </div>
                  <div className="ml-auto flex gap-1">
                    {card.benefits.map((_, idx) => (
                      <div key={idx} className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2 group-hover:text-green-600 transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
                  {card.description}
                </p>

                {/* Benefit tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {card.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100"
                    >
                      <Sparkles className="w-3 h-3" />
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* CTA button */}
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold py-3 rounded-2xl transition-all duration-200 shadow-md shadow-green-500/20 group-hover:shadow-lg group-hover:shadow-green-500/30">
                  <span>Explorar</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
