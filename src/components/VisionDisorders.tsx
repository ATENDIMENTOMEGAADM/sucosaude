import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { Eye, Droplet, Sparkles, Activity, Info, Check, Leaf, Heart, Shield, Zap, Beaker, Play, Calendar, Wheat, Circle, Atom } from 'lucide-react';
import { motion } from 'motion/react';
import { TreatmentModal } from './TreatmentModal';
import { PersonalizedPlanTable } from './PersonalizedPlanTable';

export const VisionDisorders: React.FC = () => {
  const { t } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleGeneratePlan = (data: any) => {
    setUserData(data);
    // Scroll to the plan section after a short delay
    setTimeout(() => {
      document.getElementById('personalized-plan')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 max-w-6xl mx-auto pb-12"
    >
      <TreatmentModal 
        isOpen={showTreatmentModal} 
        onClose={() => setShowTreatmentModal(false)} 
        onGeneratePlan={handleGeneratePlan}
      />

      {/* Hero Section with Image */}
      <motion.div 
        variants={itemVariants}
        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[500px] flex items-center justify-center border border-gray-100/20"
      >
        <div className="absolute inset-0">
          <img 
            src="https://storage.googleapis.com/aistudio-user-uploads-us-central1/project-678502804561/0d683693-01c3-426d-a1c2-3e2b2024b172/image.png" 
            alt="Óculos e teste de visão" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto p-8 flex flex-col items-center mt-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-white/10 text-white border border-white/20 backdrop-blur-md px-5 py-2 rounded-full font-medium tracking-wide text-sm mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span>BEBIDAS PARA OS OLHOS</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl"
          >
            Transtornos da Visão
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-200 font-light drop-shadow-md mb-10 max-w-2xl leading-relaxed"
          >
            "Os pigmentos vegetais são poderosos antioxidantes que protegem a retina e melhoram a visão."
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTreatmentModal(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:from-blue-400 hover:to-indigo-500 transition-all flex items-center gap-3 text-lg border border-white/10"
          >
            <Calendar className="w-6 h-6" />
            Adicionar Tratamento Personalizado
          </motion.button>
        </div>
      </motion.div>

      {userData && (
        <div id="personalized-plan">
          <PersonalizedPlanTable userData={userData} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Article Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 via-indigo-50/50 to-transparent rounded-bl-full -z-10 opacity-60 group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="flex items-center gap-5 mb-10">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200 transform -rotate-3">
                <Beaker className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Suco Pigmento Triplo</h2>
            </div>
            
            <div className="prose prose-lg text-gray-600 max-w-none text-left">
              <p className="text-xl leading-relaxed text-gray-700 text-left font-medium">
                A retina é o revestimento sensível dos olhos, o sensor biológico da visão, que transforma os raios luminosos em correntes elétricas. As células da retina, sensíveis à luz, chamadas cones e bastonetes, necessitam de pigmentos vegetais para se regenerar e manter a visão.
              </p>
              
              <div className="my-10 p-8 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl border border-blue-100/50 flex flex-col md:flex-row gap-8 items-center text-left shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <h3 className="text-xl font-bold text-slate-900 m-0">O Poder dos Pigmentos</h3>
                  </div>
                  <p className="text-slate-700 m-0 text-left leading-relaxed">
                    O suco <strong className="text-blue-700">PIGMENTO TRIPLO</strong> fornece precisamente os corantes vegetais de que as células da retina necessitam para funcionar perfeitamente.
                  </p>
                </div>
                <div className="flex -space-x-4 hover:space-x-2 transition-all duration-300">
                  <img src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=150&q=80" alt="Cenoura" className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=150&q=80" alt="Espinafre" className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=150&q=80" alt="Mirtilo" className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-indigo-500" />
                Efeitos sobre a visão
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Aumenta a acuidade visual.',
                  'Melhora a percepção das cores.',
                  'Reduz a fadiga visual após um brilho intenso.',
                  'Melhora a adaptação ao escuro.',
                  'Protege contra a degeneração macular da retina.'
                ].map((effect, idx) => (
                  <motion.div 
                    whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }}
                    key={idx} 
                    className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all cursor-default"
                  >
                    <div className="bg-indigo-50 p-1.5 rounded-full mt-0.5">
                      <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    </div>
                    <span className="text-gray-700 font-medium leading-snug">{effect}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interactive Recipe Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-purple-100 p-3 rounded-2xl">
                <Play className="w-8 h-8 text-purple-600 fill-purple-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Preparo Interativo
              </h2>
            </div>
            
            <div className="grid md:grid-cols-5 gap-10">
              <div className="md:col-span-2 space-y-8">
                <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100/50">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <Leaf className="w-6 h-6 text-green-600" />
                    Ingredientes
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mb-6">Para 2 porções de 250 ml</p>
                  
                  <div className="space-y-5">
                    {[
                      { name: 'Espinafre', qty: '4 xícaras', desc: 'cerca de 120 g', color: 'bg-green-500', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=150&q=80' },
                      { name: 'Cenouras médias', qty: '5 unidades', desc: 'cerca de 300 g', color: 'bg-orange-500', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=150&q=80' },
                      { name: 'Suco de mirtilo', qty: '1 xícara', desc: 'ou ameixa roxa/amora', color: 'bg-purple-500', img: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=150&q=80' }
                    ].map((ing, idx) => (
                      <motion.div whileHover={{ x: 5 }} key={idx} className="flex items-center gap-4 group">
                        <img src={ing.img} alt={ing.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-all" referrerPolicy="no-referrer" />
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <div className={`w-2.5 h-2.5 ${ing.color} rounded-full shadow-sm`}></div>
                            <strong className="text-gray-900 font-bold">{ing.qty}</strong>
                          </div>
                          <span className="text-gray-600 text-sm font-medium">{ing.name} <span className="text-gray-400 font-normal">({ing.desc})</span></span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  Passo a Passo
                </h3>
                <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[1.375rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-100 before:via-blue-200 before:to-transparent">
                  {[
                    'Lave bem todos os ingredientes em água corrente.',
                    'Passe o espinafre e as cenouras pelo multiprocessador ou centrífuga.',
                    'Acrescente o suco de fruta e misture bem. Se usar frutas in natura, bata tudo no liquidificador.',
                    'Sirva imediatamente. Não é preciso adoçar!'
                  ].map((step, idx) => {
                    const isCompleted = completedSteps.includes(idx);
                    return (
                      <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleStep(idx)}
                        className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer p-5 rounded-3xl border-2 transition-all duration-300 ${isCompleted ? 'bg-blue-50/50 border-blue-200 shadow-inner' : 'bg-white border-gray-100 hover:border-blue-300 shadow-sm hover:shadow-md'}`}
                      >
                        <div className="flex items-center gap-5 w-full">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-2xl border-2 flex-shrink-0 transition-all duration-300 shadow-sm ${isCompleted ? 'bg-blue-500 border-blue-500 text-white scale-110' : 'bg-white border-gray-200 text-gray-400 group-hover:border-blue-400 group-hover:text-blue-500'}`}>
                            {isCompleted ? <Check className="w-6 h-6" /> : <span className="font-bold text-lg">{idx + 1}</span>}
                          </div>
                          <span className={`text-lg font-medium leading-snug transition-all duration-300 ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 group-hover:text-gray-900'}`}>
                            {step}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {completedSteps.length === 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mt-8 p-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-3xl text-center font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-200"
                  >
                    <Sparkles className="w-6 h-6" />
                    <span className="text-lg">Seu suco está pronto para ser saboreado!</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Nutritional Info Circles */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-orange-100 p-3 rounded-2xl">
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Informação Nutricional</h3>
            </div>
            <p className="text-gray-500 mb-10 text-lg">Com base na quantidade diária recomendada (QDR) para um adulto (copo de 250 ml):</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
              {[
                { label: 'Calorias', value: '116', pct: 6, color: 'text-orange-500', stroke: 'stroke-orange-500', bg: 'bg-orange-50' },
                { label: 'Açúcares', value: '14g', pct: 16, color: 'text-pink-500', stroke: 'stroke-pink-500', bg: 'bg-pink-50' },
                { label: 'Gorduras', value: '0.7g', pct: 1, color: 'text-yellow-500', stroke: 'stroke-yellow-500', bg: 'bg-yellow-50' },
                { label: 'Sódio', value: '0.1g', pct: 5, color: 'text-blue-500', stroke: 'stroke-blue-500', bg: 'bg-blue-50' },
                { label: 'Proteínas', value: '2.8g', pct: 6, color: 'text-green-500', stroke: 'stroke-green-500', bg: 'bg-green-50' },
                { label: 'Fibras', value: '0.9g', pct: 4, color: 'text-purple-500', stroke: 'stroke-purple-500', bg: 'bg-purple-50' },
              ].map((item, idx) => (
                <motion.div 
                  whileHover={{ y: -8, scale: 1.05 }}
                  key={idx} 
                  className="flex flex-col items-center relative group w-full"
                >
                  <div className={`relative w-24 h-24 flex items-center justify-center mb-4 rounded-full ${item.bg} shadow-inner`}>
                    <svg className="w-full h-full transform -rotate-90 absolute inset-0 drop-shadow-sm">
                      <circle cx="48" cy="48" r="42" className="stroke-white" strokeWidth="8" fill="none" />
                      <motion.circle 
                        initial={{ strokeDasharray: "0 1000" }}
                        whileInView={{ strokeDasharray: `${(item.pct / 100) * 264} 1000` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
                        cx="48" cy="48" r="42" 
                        className={item.stroke} 
                        strokeWidth="8" 
                        fill="none" 
                        strokeLinecap="round" 
                      />
                    </svg>
                    <div className="flex flex-col items-center justify-center bg-white rounded-full w-16 h-16 shadow-md z-10">
                      <span className="font-extrabold text-gray-900 text-base">{item.value}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-1">{item.label}</span>
                  <span className={`text-lg font-black ${item.color}`}>{item.pct}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* Properties */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-[2rem] p-8 border border-amber-100/50 shadow-sm">
            <h3 className="text-2xl font-extrabold text-amber-900 mb-6 flex items-center gap-3">
              <Shield className="w-7 h-7 text-amber-500" />
              Propriedades
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                'Protetor da visão', 'Antioxidante', 'Alcalinizante', 
                'Mineralizante', 'Anticancerígeno', 'Vitamínico'
              ].map((prop, idx) => (
                <span key={idx} className="bg-white text-amber-800 px-4 py-2 rounded-xl text-sm font-bold shadow-sm border border-amber-100/50 hover:bg-amber-100 hover:text-amber-900 transition-colors cursor-default">
                  {prop}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Vitamins & Minerals (Animated Bars) */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-purple-100/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-50 to-transparent rounded-bl-full -z-10 opacity-70"></div>
            <h3 className="text-2xl font-extrabold text-purple-900 mb-2">Vitaminas e minerais</h3>
            <p className="text-sm text-purple-600 mb-8 font-medium">% Valor Diário por porção</p>
            
            <div className="space-y-5">
              {[
                { name: 'Vitamina K', val: 100, display: '195%', color: 'bg-purple-500' },
                { name: 'Vitamina A', val: 100, display: '121%', color: 'bg-indigo-500' },
                { name: 'Vitamina C', val: 30, display: '30%', color: 'bg-blue-500' },
                { name: 'Folato', val: 27, display: '27%', color: 'bg-teal-500' },
                { name: 'Vitamina B6', val: 16, display: '16%', color: 'bg-green-500' },
                { name: 'Potássio', val: 14, display: '14%', color: 'bg-yellow-500' },
                { name: 'Magnésio', val: 12, display: '12%', color: 'bg-orange-500' },
                { name: 'Ferro', val: 10, display: '10%', color: 'bg-red-500' },
              ].map((nutrient, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-gray-700 group-hover:text-gray-900 transition-colors">{nutrient.name}</span>
                    <span className="font-black text-gray-900">{nutrient.display}</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(nutrient.val, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                      className={`h-full rounded-full ${nutrient.color} shadow-sm`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-5">
            {[
              { icon: <img src="https://img.icons8.com/fluency/96/leaf.png" alt="Vegetariana" className="w-9 h-9 drop-shadow-sm" />, title: 'Vegetariana', desc: 'Total', bg: 'bg-green-50' },
              { icon: <img src="https://img.icons8.com/fluency/96/wheat.png" alt="Sem glúten" className="w-9 h-9 drop-shadow-sm" />, title: 'Sem glúten', desc: 'Apropriada para celíacos', bg: 'bg-yellow-50' },
              { icon: <img src="https://img.icons8.com/fluency/96/diabetes.png" alt="Diabetes" className="w-9 h-9 drop-shadow-sm" />, title: 'Diabetes', desc: 'Recomendada', bg: 'bg-indigo-50' },
              { icon: <img src="https://img.icons8.com/fluency/96/shield.png" alt="Alergia alimentar" className="w-9 h-9 drop-shadow-sm" />, title: 'Alergia alimentar', desc: 'Sem precauções especiais', bg: 'bg-red-50' },
              { icon: <img src="https://img.icons8.com/fluency/96/test-tube.png" alt="Poder antioxidante" className="w-9 h-9 drop-shadow-sm" />, title: 'Poder antioxidante', desc: '7.113 ORAC por porção', bg: 'bg-pink-50' },
              { icon: <img src="https://img.icons8.com/fluency/96/scale.png" alt="Carga ácida" className="w-9 h-9 drop-shadow-sm" />, title: 'Carga ácida (PRAL)', desc: '-4,38 mEq/ 100 g', bg: 'bg-teal-50' },
            ].map((badge, idx) => (
              <motion.div 
                whileHover={{ x: 5, backgroundColor: '#f8fafc' }}
                key={idx} 
                className="flex items-center gap-5 p-4 rounded-2xl transition-colors cursor-default border border-transparent hover:border-gray-100"
              >
                <div className={`${badge.bg} w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm flex-shrink-0`}>
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 leading-tight">{badge.title}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-tight mt-1">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Callout */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-[2rem] p-10 text-white shadow-xl text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
              <Eye className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-extrabold mb-4">Cores que curam</h3>
              <p className="text-green-50 leading-relaxed text-left text-lg font-medium">
                Os pigmentos naturais da cenoura, do espinafre e do mirtilo regeneram o desgaste das células sensíveis da retina e corrigem muitos transtornos visuais.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

