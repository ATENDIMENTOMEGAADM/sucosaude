import React, { useState } from 'react';
import { Check, Droplet, Leaf, Sparkles, ArrowLeft, Clock, ChefHat, Star } from 'lucide-react';
import { motion } from 'motion/react';

export interface JuiceCard {
  title: string;
  description: string;
  ingredients: string[];
  properties: string;
  prepTime?: string;
  difficulty?: string;
}

export interface ThemeData {
  id: string;
  label: string;
  badge: string;
  headline: string;
  subheadline: string;
  heroGradient: string;
  heroGlow: string;
  accentFrom: string;
  accentTo: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  icon: React.ReactNode;
  heroIcon: React.ReactNode;
  benefits: string[];
  juices: JuiceCard[];
  tips: string[];
}

interface ThemePageProps {
  data: ThemeData;
  onBack: () => void;
}

export const ThemePage: React.FC<ThemePageProps> = ({ data, onBack }) => {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 max-w-6xl mx-auto pb-12"
    >
      {/* ── Back ── */}
      <motion.button
        variants={itemVariants}
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors group"
      >
        <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-green-300 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </span>
        Voltar à biblioteca
      </motion.button>

      {/* ── Hero ── */}
      <motion.div
        variants={itemVariants}
        className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[420px] flex items-center justify-center bg-gradient-to-br ${data.heroGradient}`}
      >
        {/* Decorative blobs */}
        <div className={`absolute -top-16 -right-16 w-80 h-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${data.heroGlow}`} />
        <div className={`absolute -bottom-12 -left-12 w-64 h-64 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${data.heroGlow}`} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-8 py-16 flex flex-col items-center">
          <div className="flex items-center gap-2 bg-white/10 text-white border border-white/20 backdrop-blur-md px-5 py-2 rounded-full font-medium tracking-wide text-sm mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-white/80" />
            <span>{data.badge}</span>
          </div>

          <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center mb-6 shadow-xl">
            {data.heroIcon}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-lg">
            {data.headline}
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
            {data.subheadline}
          </p>
        </div>
      </motion.div>

      {/* ── Benefits ── */}
      <motion.section variants={itemVariants} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className={`px-6 pt-6 pb-4 flex items-center gap-3 border-b border-slate-100`}>
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${data.accentFrom} ${data.accentTo} flex items-center justify-center shadow-md`}>
            <Star className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Benefícios Principais</h2>
        </div>
        <div className="p-5 flex flex-wrap gap-2.5">
          {data.benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl ${data.accentBg} ${data.accentBorder} border`}
            >
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${data.accentFrom} ${data.accentTo} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className={`text-sm font-semibold ${data.accentText}`}>{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Juice cards ── */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center gap-2 mb-5">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${data.accentFrom} ${data.accentTo} flex items-center justify-center shadow-md`}>
            <Droplet className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Receitas Recomendadas</h2>
          <span className="ml-auto text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">{data.juices.length} receitas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.juices.map((juice, idx) => (
            <motion.div
              key={idx}
              layout
              onClick={() => setOpenCard(openCard === idx ? null : idx)}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
            >
              {/* Card header */}
              <div className={`h-2 bg-gradient-to-r ${data.accentFrom} ${data.accentTo}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${data.accentFrom} ${data.accentTo} flex items-center justify-center shadow-md flex-shrink-0`}>
                      <span className="text-white font-bold text-sm">{idx + 1}</span>
                    </div>
                    <h3 className={`font-bold text-slate-900 text-base leading-snug group-hover:${data.accentText} transition-colors`}>
                      {juice.title}
                    </h3>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${data.accentBg} ${data.accentText} border ${data.accentBorder} flex-shrink-0`}>
                    {juice.prepTime ?? '10 min'}
                  </span>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-4">{juice.description}</p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                    <Clock className="w-3 h-3" />{juice.prepTime ?? '10 min'}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                    <ChefHat className="w-3 h-3" />{juice.difficulty ?? 'Fácil'}
                  </span>
                </div>

                {/* Expandable content */}
                {openCard === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-100 pt-4 space-y-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Leaf className={`w-4 h-4 ${data.accentText}`} />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ingredientes</span>
                      </div>
                      <ul className="space-y-1.5">
                        {juice.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                            <span className={`w-5 h-5 rounded-lg bg-gradient-to-br ${data.accentFrom} ${data.accentTo} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{i + 1}</span>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`${data.accentBg} ${data.accentBorder} border rounded-2xl px-4 py-3`}>
                      <p className={`text-xs font-semibold ${data.accentText} flex items-start gap-2`}>
                        <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        {juice.properties}
                      </p>
                    </div>
                  </motion.div>
                )}

                <button className={`w-full mt-3 py-2 text-xs font-bold ${data.accentText} opacity-60 hover:opacity-100 transition-opacity`}>
                  {openCard === idx ? '▲ Fechar' : '▼ Ver ingredientes'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Tips ── */}
      <motion.section variants={itemVariants} className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800">
        <div className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-slate-800">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${data.accentFrom} ${data.accentTo} flex items-center justify-center shadow-md`}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white">Dicas Importantes</h2>
        </div>
        <ul className="p-5 space-y-3">
          {data.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`w-6 h-6 rounded-xl bg-gradient-to-br ${data.accentFrom} ${data.accentTo} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5 shadow-sm`}>{i + 1}</span>
              <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  );
};
