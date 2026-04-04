import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Activity, User, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGeneratePlan: (data: any) => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({ isOpen, onClose, onGeneratePlan }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    anamnesis: '',
    allergies: '',
    goals: 'Melhorar a visão geral'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePlan(formData);
    onClose();
    // Reset after close
    setTimeout(() => {
      setStep(1);
      setFormData({
        weight: '',
        height: '',
        age: '',
        anamnesis: '',
        allergies: '',
        goals: 'Melhorar a visão geral'
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Plano Personalizado
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {/* Progress Bar */}
              <div className="flex gap-2 mb-8">
                <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-100'}`} />
                <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-100'}`} />
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Dados Físicos
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                          <input
                            type="number"
                            name="weight"
                            required
                            value={formData.weight}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Ex: 70"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
                          <input
                            type="number"
                            name="height"
                            required
                            value={formData.height}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Ex: 175"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                        <input
                          type="number"
                          name="age"
                          required
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Ex: 35"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.weight || !formData.height || !formData.age}
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Próximo Passo
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Anamnese
                      </h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Histórico Médico / Sintomas</label>
                        <textarea
                          name="anamnesis"
                          required
                          value={formData.anamnesis}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                          placeholder="Descreva problemas de visão, fadiga ocular, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alergias ou Restrições</label>
                        <input
                          type="text"
                          name="allergies"
                          value={formData.allergies}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="Ex: Nenhuma, alergia a cenoura..."
                        />
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          disabled={!formData.anamnesis}
                          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          Gerar Plano de 7 Dias
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
