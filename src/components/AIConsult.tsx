import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthProvider';
import { useLanguage } from '../i18n';
import { Send, Bot, User as UserIcon, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AIConsult: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [consumptionContext, setConsumptionContext] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: t('ai.defaultGreeting') }]);
  }, [language, t]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'consumptions'),
          where('userId', '==', user.uid),
          orderBy('consumedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const history = snapshot.docs.map(doc => doc.data());

        let context = "User's recent juice consumption history:\n";
        if (history.length === 0) {
          context += 'No juices logged yet.\n';
        } else {
          history.slice(0, 10).forEach((log: any) => {
            const date = log.consumedAt?.toDate ? log.consumedAt.toDate().toLocaleDateString() : 'Unknown date';
            const ingredients = log.customIngredients
              ? log.customIngredients.join(', ')
              : log.recipeId ? `Recipe ID: ${log.recipeId}` : 'Unknown';
            context += `- ${date}: ${log.quantityMl}ml of [${ingredients}]\n`;
          });
        }
        setConsumptionContext(context);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'consumptions');
      }
    };
    fetchHistory();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

      const systemInstruction = `You are a health consultative AI for a juice tracking app called SucoSaúde.
You provide advice on juice recipes, health benefits of ingredients, and analyze the user's consumption history.
Be encouraging, scientifically accurate but accessible, and concise.
IMPORTANT: You MUST reply in the following language: ${language === 'pt' ? 'Portuguese' : language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : 'English'}.
Here is the user's recent context:\n${consumptionContext}`;

      const chat = ai.chats.create({
        model: 'gemini-3.1-pro-preview',
        config: { systemInstruction, temperature: 0.7 },
      });

      for (const msg of messages.slice(1)) {
        await chat.sendMessage({ message: msg.text });
      }

      const response = await chat.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text || t('ai.error') }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: t('ai.error') }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-80px)] max-w-3xl mx-auto"
    >
      {/* ── Header ── */}
      <div className="bg-slate-900 rounded-t-3xl px-5 py-4 flex items-center gap-3 border border-slate-800 border-b-0 flex-shrink-0">
        <div className="relative">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-slate-900" />
        </div>
        <div>
          <h2 className="font-bold text-white text-sm">{t('ai.title')}</h2>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-violet-400" />
            <p className="text-violet-300 text-xs font-medium">{t('ai.poweredBy')}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto bg-slate-950 border-x border-slate-800 p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md shadow-violet-500/20">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-sm shadow-lg shadow-green-500/20'
                  : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700/60'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0">
                  <UserIcon className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md shadow-violet-500/20">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-800 border border-slate-700/60 rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5">
              {[0, 0.18, 0.36].map((delay, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <div className="bg-slate-900 rounded-b-3xl px-4 py-4 border border-slate-800 border-t border-slate-800/80 flex-shrink-0">
        <form onSubmit={handleSend} className="flex gap-2">
          <div className="flex-1 relative">
            <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t('ai.placeholder')}
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};
