import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import {
  Search, Eye, Leaf, Clock, ChefHat, Sparkles, ArrowRight, SlidersHorizontal, X,
  Shield, Zap, Heart, Wind, Brain, Droplet, Activity, Baby, Bone, FlaskConical, Apple,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecipeLibraryProps {
  onSelectRecipe: (recipeId: string) => void;
  onNavigate: (tab: string) => void;
}

export const RecipeLibrary: React.FC<RecipeLibraryProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const themeCards = [
    {
      id: 'vision',
      title: 'Transtornos da Visão',
      theme: 'Olhos',
      category: 'olhos',
      description: 'Sucos ricos em luteína, zeaxantina e vitamina A para proteger a retina, prevenir catarata e degeneração macular.',
      img: '/juices.png',
      icon: <Eye className="w-5 h-5" />,
      accentFrom: 'from-blue-500',
      accentTo: 'to-indigo-600',
      glowColor: 'shadow-blue-500/20',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
      keywords: ['olhos', 'visão', 'luteína', 'retina', 'catarata'],
      prepTime: '10 min',
      difficulty: 'Fácil',
      benefits: ['Luteína', 'Vitamina A', 'Zeaxantina'],
    },
    {
      id: 'nervo',
      title: 'Sistema Nervoso',
      theme: 'Nervoso',
      category: 'nervoso',
      description: 'Bebidas com triptofano, melatonina e vitaminas B para ansiedade, insônia, depressão e proteção neurológica.',
      img: '/juices.png',
      icon: <Brain className="w-5 h-5" />,
      accentFrom: 'from-violet-500',
      accentTo: 'to-purple-600',
      glowColor: 'shadow-violet-500/20',
      badgeColor: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
      keywords: ['nervoso', 'ansiedade', 'insônia', 'depressão', 'memória'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Triptofano', 'Melatonina', 'Vitaminas B'],
    },
    {
      id: 'cardiovascular',
      title: 'Sistema Cardiovascular',
      theme: 'Coração',
      category: 'cardiovascular',
      description: 'Flavonoides, nitratos e antioxidantes para reduzir colesterol, controlar pressão e fortalecer o coração.',
      img: '/juices.png',
      icon: <Heart className="w-5 h-5" />,
      accentFrom: 'from-red-500',
      accentTo: 'to-rose-600',
      glowColor: 'shadow-red-500/20',
      badgeColor: 'bg-red-500/15 text-red-400 border-red-500/20',
      keywords: ['coração', 'cardiovascular', 'pressão', 'colesterol', 'artérias'],
      prepTime: '8 min',
      difficulty: 'Fácil',
      benefits: ['Flavonoides', 'Nitratos', 'Licopeno'],
    },
    {
      id: 'sangue',
      title: 'Sangue',
      theme: 'Sangue',
      category: 'sangue',
      description: 'Ferro, ácido fólico e clorofila para combater anemia, enriquecer o sangue e melhorar a circulação.',
      img: '/juices.png',
      icon: <Droplet className="w-5 h-5" />,
      accentFrom: 'from-rose-500',
      accentTo: 'to-red-600',
      glowColor: 'shadow-rose-500/20',
      badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
      keywords: ['sangue', 'anemia', 'ferro', 'clorofila', 'hemoglobina'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Ferro', 'Clorofila', 'Ácido Fólico'],
    },
    {
      id: 'respiratorio',
      title: 'Sistema Respiratório',
      theme: 'Respiração',
      category: 'respiratorio',
      description: 'Bebidas expectorantes, broncodilatadoras e antiinflamatórias para gripe, asma, bronquite e tosse.',
      img: '/juices.png',
      icon: <Wind className="w-5 h-5" />,
      accentFrom: 'from-sky-500',
      accentTo: 'to-cyan-600',
      glowColor: 'shadow-sky-500/20',
      badgeColor: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
      keywords: ['respiratório', 'asma', 'bronquite', 'tosse', 'pulmão'],
      prepTime: '8 min',
      difficulty: 'Fácil',
      benefits: ['Expectorante', 'Vitamina C', 'Broncodilatador'],
    },
    {
      id: 'figado',
      title: 'Fígado',
      theme: 'Fígado',
      category: 'figado',
      description: 'Silimarina, clorofila e fitoquímicos que estimulam e protegem o fígado, favorecendo a eliminação de toxinas.',
      img: '/juices.png',
      icon: <Activity className="w-5 h-5" />,
      accentFrom: 'from-amber-500',
      accentTo: 'to-yellow-600',
      glowColor: 'shadow-amber-500/20',
      badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
      keywords: ['fígado', 'hepatite', 'detox', 'silimarina', 'colelitiase'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Silimarina', 'Clorofila', 'Depurativo'],
    },
    {
      id: 'estomago',
      title: 'Estômago',
      theme: 'Estômago',
      category: 'estomago',
      description: 'Bebidas com propriedades antiácidas, cicatrizantes e digestivas para gastrite, úlcera e refluxo.',
      img: '/juices.png',
      icon: <FlaskConical className="w-5 h-5" />,
      accentFrom: 'from-orange-500',
      accentTo: 'to-amber-600',
      glowColor: 'shadow-orange-500/20',
      badgeColor: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
      keywords: ['estômago', 'gastrite', 'úlcera', 'refluxo', 'digestão'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Antiácido', 'Cicatrizante', 'Digestivo'],
    },
    {
      id: 'intestino',
      title: 'Intestino',
      theme: 'Intestino',
      category: 'intestino',
      description: 'Fibras, probióticos e mucilagens para constipação, diarreias, síndrome do intestino irritável e inflamações intestinais.',
      img: '/juices.png',
      icon: <Leaf className="w-5 h-5" />,
      accentFrom: 'from-teal-500',
      accentTo: 'to-emerald-600',
      glowColor: 'shadow-teal-500/20',
      badgeColor: 'bg-teal-500/15 text-teal-400 border-teal-500/20',
      keywords: ['intestino', 'constipação', 'diarreia', 'cólon', 'intestino irritável'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Fibras', 'Probióticos', 'Mucilagem'],
    },
    {
      id: 'urinario',
      title: 'Aparelho Urinário',
      theme: 'Urinário',
      category: 'urinario',
      description: 'Bebidas diuréticas, antisépticas e alcalinizantes para cistite, cálculos renais, infecção urinária e retenção.',
      img: '/juices.png',
      icon: <Droplet className="w-5 h-5" />,
      accentFrom: 'from-cyan-500',
      accentTo: 'to-blue-600',
      glowColor: 'shadow-cyan-500/20',
      badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
      keywords: ['urinário', 'cistite', 'rim', 'cálculo', 'diurético'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Diurético', 'Antiséptico', 'Alcalinizante'],
    },
    {
      id: 'reprodutor',
      title: 'Aparelho Reprodutor',
      theme: 'Reprodutor',
      category: 'reprodutor',
      description: 'Vitaminas E, C e fitoestrogênios para saúde hormonal, fertilidade, menopausa e próstata.',
      img: '/juices.png',
      icon: <Baby className="w-5 h-5" />,
      accentFrom: 'from-pink-500',
      accentTo: 'to-fuchsia-600',
      glowColor: 'shadow-pink-500/20',
      badgeColor: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
      keywords: ['reprodutor', 'menopausa', 'próstata', 'fertilidade', 'hormônios'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Vitamina E', 'Fitoestrogênios', 'Antioxidante'],
    },
    {
      id: 'metabolismo',
      title: 'Metabolismo',
      theme: 'Metabolismo',
      category: 'metabolismo',
      description: 'Bebidas que regulam glicose, colesterol e ácido úrico para diabetes, obesidade, gota e dislipidemia.',
      img: '/juices.png',
      icon: <Zap className="w-5 h-5" />,
      accentFrom: 'from-lime-500',
      accentTo: 'to-green-600',
      glowColor: 'shadow-lime-500/20',
      badgeColor: 'bg-lime-500/15 text-lime-600 border-lime-500/20',
      keywords: ['metabolismo', 'diabetes', 'obesidade', 'gota', 'colesterol'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Regulador Glicose', 'Antiobésidade', 'Antioxidante'],
    },
    {
      id: 'locomotor',
      title: 'Aparelho Locomotor',
      theme: 'Locomotor',
      category: 'locomotor',
      description: 'Silício, cálcio e antiinflamatórios naturais para artrite, reumatismo, osteoporose e dores musculares.',
      img: '/juices.png',
      icon: <Bone className="w-5 h-5" />,
      accentFrom: 'from-slate-500',
      accentTo: 'to-gray-600',
      glowColor: 'shadow-slate-500/20',
      badgeColor: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
      keywords: ['locomotor', 'artrite', 'reumatismo', 'ossos', 'articulações'],
      prepTime: '8 min',
      difficulty: 'Fácil',
      benefits: ['Silício', 'Cálcio', 'Antiinflamatório'],
    },
    {
      id: 'pele',
      title: 'Pele',
      theme: 'Pele',
      category: 'pele',
      description: 'Vitaminas A, C e E, silício e antioxidantes que combatem acne, eczema, psoríase e o envelhecimento cutâneo.',
      img: '/juices.png',
      icon: <Apple className="w-5 h-5" />,
      accentFrom: 'from-rose-400',
      accentTo: 'to-pink-500',
      glowColor: 'shadow-rose-400/20',
      badgeColor: 'bg-rose-400/15 text-rose-400 border-rose-400/20',
      keywords: ['pele', 'acne', 'eczema', 'psoríase', 'colágeno'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Vitamina A', 'Vitamina C', 'Silício'],
    },
    {
      id: 'imunologico',
      title: 'Sistema Imunológico',
      theme: 'Imunidade',
      category: 'imunologico',
      description: 'Vitamina C, zinco e fitoquímicos imunoestimulantes para fortalecer as defesas e combater infecções.',
      img: '/juices.png',
      icon: <Shield className="w-5 h-5" />,
      accentFrom: 'from-emerald-500',
      accentTo: 'to-green-600',
      glowColor: 'shadow-emerald-500/20',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
      keywords: ['imunidade', 'defesa', 'vitamina c', 'zinco', 'infecção'],
      prepTime: '5 min',
      difficulty: 'Fácil',
      benefits: ['Vitamina C', 'Zinco', 'Imunoestimulante'],
    },
  ];

  const filters = [
    { id: 'all',           label: 'Todos',        icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'olhos',         label: 'Olhos',         icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'nervoso',       label: 'Nervoso',        icon: <Brain className="w-3.5 h-3.5" /> },
    { id: 'cardiovascular',label: 'Coração',        icon: <Heart className="w-3.5 h-3.5" /> },
    { id: 'sangue',        label: 'Sangue',         icon: <Droplet className="w-3.5 h-3.5" /> },
    { id: 'respiratorio',  label: 'Respiração',     icon: <Wind className="w-3.5 h-3.5" /> },
    { id: 'figado',        label: 'Fígado',         icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'estomago',      label: 'Estômago',       icon: <FlaskConical className="w-3.5 h-3.5" /> },
    { id: 'intestino',     label: 'Intestino',      icon: <Leaf className="w-3.5 h-3.5" /> },
    { id: 'urinario',      label: 'Urinário',       icon: <Droplet className="w-3.5 h-3.5" /> },
    { id: 'reprodutor',    label: 'Reprodutor',     icon: <Baby className="w-3.5 h-3.5" /> },
    { id: 'metabolismo',   label: 'Metabolismo',    icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'locomotor',     label: 'Locomotor',      icon: <Bone className="w-3.5 h-3.5" /> },
    { id: 'pele',          label: 'Pele',           icon: <Apple className="w-3.5 h-3.5" /> },
    { id: 'imunologico',   label: 'Imunidade',      icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  const filtered = themeCards.filter(card => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      card.title.toLowerCase().includes(q) ||
      card.theme.toLowerCase().includes(q) ||
      card.keywords.some(k => k.includes(q));
    const matchFilter = activeFilter === 'all' || card.category === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Biblioteca</span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className="text-xs text-slate-400">{themeCards.length} sistema{themeCards.length !== 1 ? 's' : ''}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('recipes.title')}
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm max-w-md">{t('recipes.subtitle')}</p>
        </div>
      </motion.div>

      {/* ── Search + Filter tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-3"
      >
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder={t('recipes.searchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm shadow-sm transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter tabs — scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                activeFilter === f.id
                  ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-green-300 hover:text-green-600'
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Cards ── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-24 flex flex-col items-center gap-4 bg-white rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <Leaf className="w-8 h-8 text-slate-400" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-700">{t('recipes.noRecipes')}</h3>
              <p className="text-slate-400 text-sm mt-1">{t('recipes.adjustSearch')}</p>
            </div>
            <button onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
              className="text-xs font-semibold text-green-600 hover:text-green-500 underline underline-offset-2">
              Limpar filtros
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((card, i) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                onClick={() => onNavigate(card.id)}
                className={`group relative bg-white rounded-3xl overflow-hidden cursor-pointer border border-slate-100 shadow-lg ${card.glowColor} hover:shadow-2xl transition-shadow duration-300`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/15 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xl border backdrop-blur-sm ${card.badgeColor}`}>
                      {card.icon}
                      {card.theme}
                    </span>
                  </div>

                  {/* Time + difficulty */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-white bg-white/15 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/20">
                      <Clock className="w-3 h-3 text-amber-300" />{card.prepTime}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-white bg-white/15 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/20">
                      <ChefHat className="w-3 h-3 text-sky-300" />{card.difficulty}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-green-600 transition-colors duration-200">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-2 mb-4">
                    {card.description}
                  </p>

                  {/* Benefit tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {card.benefits.map((b, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                        <Sparkles className="w-2.5 h-2.5" />{b}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center justify-between bg-gradient-to-r ${card.accentFrom} ${card.accentTo} text-white text-sm font-semibold px-4 py-3 rounded-2xl shadow-md transition-all duration-200 group-hover:shadow-lg`}>
                    <span>Ver receitas</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
