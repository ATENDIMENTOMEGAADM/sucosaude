import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '../i18n';
import {
  Wand2, Loader2, AlertTriangle, Droplet, Leaf, Sparkles,
  BookOpen, Calendar, ChefHat, Clock, RotateCcw, Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GeneratedJuice {
  name: string;
  targetProblem: string;
  ingredients: { item: string; amount: string }[];
  preparation: string;
  portion: string;
  benefits: { benefit: string; source: string; sourceUrl?: string }[];
  weeklyTable: { day: string; time: string; notes: string }[];
  warnings: string[];
}

function parseJuiceJSON(raw: string): GeneratedJuice | null {
  try {
    const match = raw.match(/```json\s*([\s\S]*?)```/) || raw.match(/\{[\s\S]*\}/);
    const jsonStr = match ? (match[1] ?? match[0]) : raw;
    return JSON.parse(jsonStr.trim());
  } catch {
    return null;
  }
}

const DAYS_PT = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export const JuiceGenerator: React.FC = () => {
  const { language } = useLanguage();
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedJuice | null>(null);
  const [rawText, setRawText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const SYSTEM_PROMPT = `You are a specialized nutritionist AI for the SucoSaúde platform.
The user will describe a health problem, symptom, or goal.
You MUST respond ONLY with a valid JSON object (no prose, no markdown outside the JSON block) following this exact schema:

{
  "name": "Juice name (creative, descriptive)",
  "targetProblem": "The health problem this addresses",
  "ingredients": [
    { "item": "ingredient name", "amount": "quantity (e.g. 2 medium carrots, 200ml)" }
  ],
  "preparation": "Step-by-step preparation instructions in 3-5 sentences.",
  "portion": "Recommended daily portion (e.g. 250ml once a day, morning)",
  "benefits": [
    {
      "benefit": "Specific health benefit",
      "source": "Source name (e.g. Journal of Nutrition, USDA FoodData Central, WHO, PubMed study 2022)",
      "sourceUrl": "optional real URL if known, otherwise omit"
    }
  ],
  "weeklyTable": [
    { "day": "Monday", "time": "Morning (7-8am)", "notes": "On empty stomach" },
    ... 7 days
  ],
  "warnings": ["Any relevant precaution or contraindication"]
}

Rules:
- Include 5-8 ingredients with precise amounts
- Cite 3-5 real scientific or institutional sources (PubMed, WHO, USDA, peer-reviewed journals)
- Weekly table must have exactly 7 entries (one per day)
- Use the language: ${language === 'pt' ? 'Brazilian Portuguese' : language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : 'English'}
- Base recommendations on evidence-based nutritional science only
- Be specific about quantities and timing`;

  const handleGenerate = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setRawText('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      const chat = ai.chats.create({
        model: 'gemini-2.0-flash',
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.4,
        },
      });

      const response = await chat.sendMessage({ message: problem });
      const text = response.text ?? '';
      setRawText(text);

      const parsed = parseJuiceJSON(text);
      if (parsed) {
        setResult(parsed);
      } else {
        setError('Não foi possível interpretar a resposta. Tente novamente com mais detalhes.');
      }
    } catch (e: any) {
      console.error('JuiceGenerator error:', e);
      setError(e?.message ?? 'Erro ao conectar ao serviço de IA. Verifique a chave API.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setProblem('');
    setRawText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-green-500 uppercase tracking-widest">IA Generativa</span>
          <span className="w-1 h-1 rounded-full bg-slate-400" />
          <span className="text-xs text-slate-400">Fontes científicas reais</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Gerador de Suco Saudável
        </h1>
        <p className="text-slate-500 mt-1.5 text-sm max-w-lg">
          Descreva seu problema ou objetivo de saúde e receba uma receita personalizada com ingredientes, porção e tabela semanal baseados em fontes científicas.
        </p>
      </motion.div>

      {/* ── Input card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
      >
        <div className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md shadow-green-400/25">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Descreva seu problema ou objetivo</h2>
        </div>

        <div className="p-6 space-y-4">
          <textarea
            rows={4}
            value={problem}
            onChange={e => setProblem(e.target.value)}
            disabled={loading}
            placeholder="Ex: Tenho dificuldade para dormir e sofro de ansiedade. Quero um suco que me ajude a relaxar e melhorar a qualidade do sono..."
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none disabled:opacity-60"
          />

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2">
            {[
              'Dificuldade para dormir',
              'Baixa imunidade',
              'Digestão lenta',
              'Pressão alta',
              'Cansaço e falta de energia',
              'Pele sem brilho',
              'Inflamação nas articulações',
            ].map(s => (
              <button
                key={s}
                onClick={() => setProblem(s)}
                disabled={loading}
                className="text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-green-50 hover:text-green-700 border border-slate-200 hover:border-green-300 px-3 py-1.5 rounded-xl transition-all disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={!problem.trim() || loading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all disabled:opacity-60 disabled:scale-100 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gerando receita...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Gerar Suco Personalizado
                </>
              )}
            </motion.button>

            {result && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-semibold px-4 py-3 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Nova consulta
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Error ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4"
          >
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700">Erro ao gerar receita</p>
              <p className="text-xs text-red-600 mt-0.5">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Loading skeleton ── */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {[80, 60, 40, 90].map((w, i) => (
            <div key={i} className="h-4 bg-slate-200 rounded-full animate-pulse" style={{ width: `${w}%` }} />
          ))}
        </motion.div>
      )}

      {/* ── Result ── */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Title card */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-800">
              <div className="h-1.5 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/30 flex-shrink-0">
                    <Droplet className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-1">Receita Gerada por IA</p>
                    <h2 className="text-2xl font-extrabold text-white leading-tight">{result.name}</h2>
                    <p className="text-slate-400 text-sm mt-1">Para: <span className="text-slate-200 font-semibold">{result.targetProblem}</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ingredients */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 pt-5 pb-4 flex items-center gap-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-sm">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Ingredientes</h3>
                  <span className="ml-auto text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">{result.ingredients.length} itens</span>
                </div>
                <ul className="p-4 space-y-2">
                  {result.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-green-50 hover:border-green-200 transition-colors">
                      <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <span className="text-slate-700 text-sm font-medium flex-1">{ing.item}</span>
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-lg">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparation + Portion */}
              <div className="space-y-4">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-5 pt-5 pb-4 flex items-center gap-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                      <ChefHat className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900">Preparo</h3>
                  </div>
                  <p className="p-5 text-slate-600 text-sm leading-relaxed">{result.preparation}</p>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-400/30">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Porção Recomendada</p>
                    <p className="text-white font-bold text-base">{result.portion}</p>
                  </div>
                </div>

                {/* Warnings */}
                {result.warnings?.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      {result.warnings.map((w, i) => (
                        <p key={i} className="text-xs text-amber-700 leading-relaxed">{w}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Benefits + Sources */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-4 flex items-center gap-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-sm">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-slate-900">Benefícios & Fontes Científicas</h3>
              </div>
              <div className="p-4 space-y-3">
                {result.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50 border border-blue-100 hover:border-blue-200 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                      <span className="text-white text-[10px] font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{b.benefit}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <BookOpen className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        {b.sourceUrl ? (
                          <a href={b.sourceUrl} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2 truncate font-medium">
                            {b.source}
                          </a>
                        ) : (
                          <span className="text-xs text-blue-500 font-medium">{b.source}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-4 flex items-center gap-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-sm">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-slate-900">Tabela Semanal de Consumo</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Dia</th>
                      <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Horário</th>
                      <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Observações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.weeklyTable.map((row, i) => (
                      <tr key={i} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-2 font-semibold text-slate-800">
                            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 text-white text-[10px] font-bold flex items-center justify-center">
                              {DAYS_PT[i]?.slice(0, 1) ?? (i + 1)}
                            </span>
                            {row.day}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">{row.time}</td>
                        <td className="px-5 py-3.5 text-slate-500 text-xs">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Nova consulta
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([rawText], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `suco-${result.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm px-5 py-2.5 rounded-2xl shadow-md shadow-green-500/20 hover:shadow-green-500/30 transition-all"
              >
                <Download className="w-4 h-4" />
                Exportar receita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
