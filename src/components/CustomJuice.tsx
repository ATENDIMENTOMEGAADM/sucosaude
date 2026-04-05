import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthProvider';
import { useLanguage } from '../i18n';
import { Plus, X, Droplet, Check, Minus, Sparkles, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRESET_VOLUMES = [150, 250, 350, 500];

export const CustomJuice: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [quantity, setQuantity] = useState<number>(250);
  const [notes, setNotes] = useState('');
  const [logging, setLogging] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const val = currentIngredient.trim();
    if (val && ingredients.length < 20) {
      setIngredients(prev => [...prev, val]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleLogConsumption = async () => {
    if (!user || ingredients.length === 0) return;
    setLogging(true);
    try {
      await addDoc(collection(db, 'consumptions'), {
        userId: user.uid,
        customIngredients: ingredients,
        quantityMl: quantity,
        consumedAt: serverTimestamp(),
        notes,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIngredients([]);
        setNotes('');
        setQuantity(250);
      }, 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'consumptions');
    } finally {
      setLogging(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Combinação</span>
          <span className="w-1 h-1 rounded-full bg-slate-400" />
          <span className="text-xs text-slate-400">Personalizada</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {t('custom.title')}
        </h1>
        <p className="text-slate-500 mt-1.5 text-sm max-w-md">{t('custom.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Ingredient builder ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Add ingredient */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md shadow-green-400/25">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{t('custom.ingredients')}</h2>
              <span className="ml-auto text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                {ingredients.length}/20
              </span>
            </div>

            <div className="p-5 space-y-4">
              {/* Input */}
              <form onSubmit={handleAddIngredient} className="flex gap-2">
                <input
                  type="text"
                  value={currentIngredient}
                  onChange={e => setCurrentIngredient(e.target.value)}
                  placeholder={t('custom.ingredientPlaceholder')}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={!currentIngredient.trim() || ingredients.length >= 20}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-2xl font-semibold text-sm shadow-md shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">{t('custom.add')}</span>
                </button>
              </form>

              {/* Tags */}
              <AnimatePresence>
                {ingredients.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-wrap gap-2 min-h-10"
                  >
                    {ingredients.map((ing, idx) => (
                      <motion.div
                        key={`${ing}-${idx}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 text-sm font-semibold px-3.5 py-2 rounded-2xl border border-emerald-200 hover:border-emerald-300 transition-colors group"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        {ing}
                        <button
                          onClick={() => handleRemoveIngredient(idx)}
                          className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-600 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-400 text-sm italic"
                  >
                    {t('custom.noIngredients')}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5"
          >
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {t('custom.notes')}
            </label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={t('custom.notesPlaceholder')}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </motion.div>
        </div>

        {/* ── Right: volume + submit ── */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-6 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-800"
          >
            <div className="px-6 pt-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Droplet className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-white">{t('custom.quantity')}</h3>
              </div>
              <p className="text-xs text-slate-400 ml-12">Defina o volume consumido</p>
            </div>

            <div className="p-6 space-y-5">
              {/* Presets */}
              <div className="grid grid-cols-2 gap-2">
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

              {/* Stepper */}
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

              {/* Submit */}
              <AnimatePresence mode="wait">
                <motion.button
                  key={success ? 'ok' : 'default'}
                  initial={{ scale: 0.97, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.97, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleLogConsumption}
                  disabled={logging || success || ingredients.length === 0}
                  className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg disabled:opacity-60 ${
                    success
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-500/25'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02]'
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
                      {t('custom.logButton')}
                    </>
                  )}
                </motion.button>
              </AnimatePresence>

              {ingredients.length > 0 && (
                <p className="text-center text-xs text-slate-500">
                  <span className="font-bold text-slate-300">{ingredients.length}</span> ingrediente{ingredients.length !== 1 ? 's' : ''} · <span className="font-bold text-slate-300">{quantity} ml</span>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
