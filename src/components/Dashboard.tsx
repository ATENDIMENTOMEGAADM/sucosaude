import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthProvider';
import { useLanguage } from '../i18n';
import { format } from 'date-fns';
import { Droplet, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

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

  const stats = [
    {
      label: t('dashboard.recentVolume'),
      value: `${totalMl} ml`,
      icon: Droplet,
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'shadow-blue-500/30',
      bg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      label: t('dashboard.entriesLogged'),
      value: consumptions.length,
      icon: Calendar,
      gradient: 'from-green-400 to-emerald-600',
      glow: 'shadow-green-500/30',
      bg: 'bg-green-500/10',
      iconColor: 'text-green-400',
    },
    {
      label: t('dashboard.currentStreak'),
      value: t('dashboard.active'),
      icon: TrendingUp,
      gradient: 'from-violet-500 to-purple-700',
      glow: 'shadow-purple-500/30',
      bg: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-8 shadow-2xl shadow-green-600/20"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-4 right-8 opacity-10">
          <Sparkles className="w-32 h-32 text-white" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="relative flex-shrink-0">
            <img
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=16a34a&color=fff`}
              alt="Profile"
              className="w-16 h-16 rounded-2xl ring-4 ring-white/30 shadow-xl object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-300 rounded-full border-2 border-emerald-600 shadow-sm" />
          </div>
          <div className="flex-1">
            <p className="text-green-100/80 text-sm font-medium mb-1 uppercase tracking-wider">
              {t('dashboard.overview')}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {t('dashboard.welcome')}, {user?.displayName?.split(' ')[0]}!
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold">{t('dashboard.active')}</span>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden bg-slate-900 rounded-2xl p-6 shadow-xl ${stat.glow} border border-slate-800 cursor-default`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* Glow line at bottom */}
              <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r ${stat.gradient} opacity-30`} />
            </motion.div>
          );
        })}
      </div>

      {/* Recent consumptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t('dashboard.recentConsumptions')}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{consumptions.length} {consumptions.length === 1 ? 'entry' : 'entries'}</p>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-md shadow-green-400/50" />
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin" />
            <p className="text-slate-400 text-sm">{t('dashboard.loading')}</p>
          </div>
        ) : consumptions.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-4 px-6 text-center">
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                <Droplet className="w-9 h-9 text-green-400" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-200/30 to-transparent animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">{t('dashboard.noLogs')}</h3>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Start tracking your eye-health juices to see your progress here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {consumptions.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors duration-150 group"
              >
                <div className="flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-200/60 flex items-center justify-center group-hover:from-green-400/30 group-hover:to-emerald-500/30 transition-all duration-200">
                      <Droplet className="w-4 h-4 text-green-600" />
                    </div>
                    {i < consumptions.length - 1 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-green-200 to-transparent" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                      {log.recipeId ? t('dashboard.recipeJuice') : t('dashboard.customCombination')}
                    </h3>
                    {log.customIngredients?.length > 0 && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {log.customIngredients.join(', ')}
                      </p>
                    )}
                    {!log.customIngredients?.length && (
                      <p className="text-xs text-slate-400 mt-0.5">{t('dashboard.fromRecipe')}</p>
                    )}
                    {log.notes && (
                      <p className="text-xs text-slate-600 mt-1.5 italic bg-slate-50 px-2.5 py-1 rounded-lg border-l-2 border-green-300">
                        "{log.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 ml-14 sm:ml-0 flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-700 border border-blue-100">
                    <Droplet className="w-3 h-3" />
                    {log.quantityMl} ml
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {log.consumedAt?.toDate ? format(log.consumedAt.toDate(), 'MMM d, h:mm a') : t('dashboard.justNow')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
