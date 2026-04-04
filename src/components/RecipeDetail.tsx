import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthProvider';
import { useLanguage } from '../i18n';
import { ArrowLeft, Check, Droplet, Leaf, Info } from 'lucide-react';

interface RecipeDetailProps {
  recipeId: string;
  onBack: () => void;
}

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
        notes: notes,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setNotes('');
      }, 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'consumptions');
    } finally {
      setLogging(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Recipe not found.</p>
        <button onClick={onBack} className="mt-4 text-green-600 font-medium hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('recipeDetail.back')}</span>
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-green-100 to-emerald-50 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-700 max-w-2xl">{recipe.description}</p>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-green-600" />
                {t('recipeDetail.ingredients')}
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {recipe.instructions && (
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('recipeDetail.instructions')}</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {recipe.instructions}
                </p>
              </section>
            )}

            {recipe.benefits && recipe.benefits.length > 0 && (
              <section>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-blue-600" />
                  {t('recipeDetail.benefits')}
                </h3>
                <ul className="space-y-2">
                  {recipe.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                <Droplet className="w-5 h-5 text-blue-600" />
                {t('recipeDetail.logConsumption')}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('recipeDetail.quantity')}
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="2000"
                    step="50"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('recipeDetail.notes')}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t('recipeDetail.notesPlaceholder')}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 sm:text-sm resize-none"
                  />
                </div>

                <button
                  onClick={handleLogConsumption}
                  disabled={logging || success}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-colors ${
                    success ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70`}
                >
                  {logging ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : success ? (
                    <>
                      <Check className="w-5 h-5" />
                      {t('recipeDetail.loggedSuccess')}
                    </>
                  ) : (
                    t('recipeDetail.logButton')
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
