import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthProvider';
import { useLanguage } from '../i18n';
import {
  ArrowLeft, Check, Droplet, Leaf, Sparkles, Clock,
  ChefHat, Minus, Plus, Star, Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecipeDetailProps {
  recipeId: string;
  onBack: () => void;
}

const PRESET_VOLUMES = [150, 250, 350, 500];

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipeId, onBack }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(250);
  const [notes, setNotes] = useState('');
  const [logging, setLogging] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, 'recipes', recipeId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipe({ id: docSnap.id, ...docSnap.data() });
        }
        setLoading(false);
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `recipes/${recipeId}`);
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleLogConsumption = async () => {
    if (!user || !recipe) return;
    setLogging(true);
    try {
      await addDoc(collection(db, 'consumptions'), {
        userId: user.uid,
        recipeId: recipe.id,
        quantityMl: quantity,
        consumedAt: serverTimestamp(),
        notes,
      });
      setSuccess(true);
      setTimeout(() => { setSuccess(false); setNotes(''); }, 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'consumptions');
    } finally {
      setLogging(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Droplet className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div className="absolute -inset-1 rounded-2xl border-2 border-green-400/40 animate-ping" />
          </div>
          <p className="text-slate-500 text-sm font-medium">{t('dashboard.loading')}</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-96 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
          <Leaf className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-slate-500 font-medium">Receita não encontrada.</p>
        <button onClick={onBack} className="text-green-600 font-semibold hover:text-green-500 transition-colors text-sm underline underline-offset-2">
          Voltar à biblioteca
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      {/* ── Back button ── */}
      <motion.button
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors group"
      >
        <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-green-300 group-hover:shadow-green-100 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </span>
        {t('recipeDetail.back')}
      </motion.button>

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl shadow-slate-900/30"
        style={{ minHeight: 280 }}
      >
        {/* Background image or gradient */}
        <div className="absolute inset-0">
          <img src="/juices.png" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-emerald-900/70" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-green-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/30 flex-shrink-0">
            <Eye className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xl border bg-green-500/15 text-green-400 border-green-500/25 backdrop-blur-sm mb-3">
              <Star className="w-3 h-3" />
              Saúde Ocular
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
              {recipe.title}
            </h1>
            {recipe.description && (
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
                {recipe.description}
              </p>
            )}

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/15">
                <Clock className="w-3.5 h-3.5 text-amber-300" /> 10 min
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/15">
                <ChefHat className="w-3.5 h-3.5 text-sky-300" /> Fácil
              </span>
              {recipe.tags?.map((tag: string, i: number) => (
                <span key={i} className="inline-flex items-center gap-1 text-xs font-semibold text-white/70 bg-white/8 px-2.5 py-1.5 rounded-xl border border-white/10">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Main content grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column — ingredients + instructions + benefits */}
        <div className="lg:col-span-2 space-y-6">

          {/* Ingredients */}
          {recipe.ingredients?.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md shadow-green-400/25">
                  <Leaf className="w-4.5 h-4.5 text-white w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">{t('recipeDetail.ingredients')}</h2>
                <span className="ml-auto text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {recipe.ingredients.length} items
                </span>
              </div>

              <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients.map((item: string, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-green-50 hover:border-green-200 transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 flex items-center justify-center flex-shrink-0 group-hover:from-green-200 group-hover:to-emerald-200 transition-colors">
                      <span className="text-xs font-bold text-green-600">{idx + 1}</span>
                    </span>
                    <span className="text-slate-700 text-sm font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Instructions */}
          {recipe.instructions && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-400/25">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">{t('recipeDetail.instructions')}</h2>
              </div>

              <div className="p-6">
                <div className="prose prose-sm prose-slate max-w-none">
                  {recipe.instructions.split('\n').filter(Boolean).map((step: string, idx: number) => (
                    <div key={idx} className="flex gap-4 mb-4 last:mb-0">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-amber-600">{idx + 1}</span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed flex-1 pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Benefits */}
          {recipe.benefits?.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-400/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">{t('recipeDetail.benefits')}</h2>
              </div>

              <div className="p-4 flex flex-wrap gap-2.5">
                {recipe.benefits.map((benefit: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.28 + idx * 0.06 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-300 transition-colors group cursor-default"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-400/30">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-blue-800">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Right column — log consumption */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-6"
          >
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-800">
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Droplet className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white">{t('recipeDetail.logConsumption')}</h3>
                </div>
                <p className="text-xs text-slate-400 ml-12">Registre sua ingestão de hoje</p>
              </div>

              <div className="p-6 space-y-5">
                {/* Volume presets */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    {t('recipeDetail.quantity')}
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {PRESET_VOLUMES.map(vol => (
                      <button
                        key={vol}
                        onClick={() => setQuantity(vol)}
                        className={`py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                          quantity === vol
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-blue-500/50 hover:text-blue-300'
                        }`}
                      >
                        {vol} ml
                      </button>
                    ))}
                  </div>

                  {/* Custom quantity stepper */}
                  <div className="flex items-center gap-3 bg-slate-800 rounded-2xl px-4 py-3 border border-slate-700">
                    <button
                      onClick={() => setQuantity(q => Math.max(50, q - 50))}
                      className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min="50"
                      max="2000"
                      step="50"
                      value={quantity}
                      onChange={e => setQuantity(Number(e.target.value))}
                      className="flex-1 bg-transparent text-center text-white font-bold text-lg focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => setQuantity(q => Math.min(2000, q + 50))}
                      className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {t('recipeDetail.notes')}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder={t('recipeDetail.notesPlaceholder')}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-slate-200 placeholder-slate-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                {/* Submit */}
                <AnimatePresence mode="wait">
                  <motion.button
                    key={success ? 'success' : 'default'}
                    initial={{ scale: 0.97, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.97, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleLogConsumption}
                    disabled={logging || success}
                    className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg disabled:opacity-70 ${
                      success
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-500/25'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]'
                    }`}
                  >
                    {logging ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : success ? (
                      <>
                        <Check className="w-5 h-5" />
                        {t('recipeDetail.loggedSuccess')}
                      </>
                    ) : (
                      <>
                        <Droplet className="w-4 h-4" />
                        {t('recipeDetail.logButton')}
                      </>
                    )}
                  </motion.button>
                </AnimatePresence>

                {/* Volume summary */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                  <Droplet className="w-3 h-3 text-blue-500" />
                  <span>Registrando <span className="font-bold text-slate-300">{quantity} ml</span> de {recipe.title}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
