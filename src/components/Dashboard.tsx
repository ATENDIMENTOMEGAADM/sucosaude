import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthProvider';
import { useLanguage } from '../i18n';
import { format } from 'date-fns';
import { Droplet, Calendar, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [consumptions, setConsumptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'consumptions'),
      where('userId', '==', user.uid),
      orderBy('consumedAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setConsumptions(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'consumptions');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const totalMl = consumptions.reduce((acc, curr) => acc + (curr.quantityMl || 0), 0);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t('dashboard.welcome')}, {user?.displayName?.split(' ')[0]}!</h1>
        <p className="text-gray-600 mt-1">{t('dashboard.overview')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Droplet className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('dashboard.recentVolume')}</p>
            <p className="text-2xl font-bold text-gray-900">{totalMl} ml</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('dashboard.entriesLogged')}</p>
            <p className="text-2xl font-bold text-gray-900">{consumptions.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-xl">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('dashboard.currentStreak')}</p>
            <p className="text-2xl font-bold text-gray-900">{t('dashboard.active')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{t('dashboard.recentConsumptions')}</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500">{t('dashboard.loading')}</div>
        ) : consumptions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {t('dashboard.noLogs')}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {consumptions.map((log) => (
              <div key={log.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-2 rounded-lg mt-1">
                    <Droplet className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {log.recipeId ? t('dashboard.recipeJuice') : t('dashboard.customCombination')}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {log.customIngredients?.join(', ') || t('dashboard.fromRecipe')}
                    </p>
                    {log.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">"{log.notes}"</p>
                    )}
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {log.quantityMl} ml
                  </span>
                  <span className="text-xs text-gray-400">
                    {log.consumedAt?.toDate ? format(log.consumedAt.toDate(), 'MMM d, h:mm a') : t('dashboard.justNow')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
