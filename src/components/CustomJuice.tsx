import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthProvider';
import { useLanguage } from '../i18n';
import { Plus, X, Droplet, Check } from 'lucide-react';

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
    if (currentIngredient.trim() && ingredients.length < 20) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
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
        notes: notes,
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
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t('custom.title')}</h1>
        <p className="text-gray-600 mt-2">{t('custom.subtitle')}</p>
      </header>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t('custom.ingredients')}</h3>
          
          <form onSubmit={handleAddIngredient} className="flex gap-2 mb-4">
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              placeholder={t('custom.ingredientPlaceholder')}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            <button
              type="submit"
              disabled={!currentIngredient.trim() || ingredients.length >= 20}
              className="bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">{t('custom.add')}</span>
            </button>
          </form>

          {ingredients.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="bg-green-50 text-green-800 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium border border-green-100">
                  {ing}
                  <button 
                    onClick={() => handleRemoveIngredient(idx)}
                    className="text-green-600 hover:text-green-900 bg-green-100 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">{t('custom.noIngredients')}</p>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('custom.quantity')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Droplet className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="50"
                max="2000"
                step="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('custom.notes')}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('custom.notesPlaceholder')}
              className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </section>

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={handleLogConsumption}
            disabled={logging || success || ingredients.length === 0}
            className={`w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white transition-colors ${
              success ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70`}
          >
            {logging ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : success ? (
              <>
                <Check className="w-5 h-5" />
                {t('recipeDetail.loggedSuccess')}
              </>
            ) : (
              t('custom.logButton')
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
