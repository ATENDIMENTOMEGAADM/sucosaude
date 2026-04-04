import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthProvider';
import { useLanguage } from '../i18n';
import { Send, Bot, User as UserIcon } from 'lucide-react';

export const AIConsult: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [consumptionContext, setConsumptionContext] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset messages when language changes to show the correct greeting
    setMessages([
      { role: 'model', text: t('ai.defaultGreeting') }
    ]);
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
          context += "No juices logged yet.\n";
        } else {
          history.slice(0, 10).forEach((log: any, index) => {
            const date = log.consumedAt?.toDate ? log.consumedAt.toDate().toLocaleDateString() : 'Unknown date';
            const ingredients = log.customIngredients ? log.customIngredients.join(', ') : (log.recipeId ? `Recipe ID: ${log.recipeId}` : 'Unknown');
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
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      for (const msg of messages.slice(1)) {
        await chat.sendMessage({ message: msg.text });
      }

      const response = await chat.sendMessage({ message: userMsg });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || t('ai.error') }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: t('ai.error') }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-80px)] max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-green-600 p-4 text-white flex items-center gap-3">
        <Bot className="w-6 h-6" />
        <div>
          <h2 className="font-bold">{t('ai.title')}</h2>
          <p className="text-green-100 text-xs">{t('ai.poweredBy')}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-green-600" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
            }`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <UserIcon className="w-5 h-5 text-gray-500" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-green-600" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('ai.placeholder')}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
