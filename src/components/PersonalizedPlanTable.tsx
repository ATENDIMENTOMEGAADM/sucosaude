import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, Circle, Clock, Droplet, Sun, Moon, Download, Printer, FileText, Info } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PersonalizedPlanTableProps {
  userData: any;
}

export const PersonalizedPlanTable: React.FC<PersonalizedPlanTableProps> = ({ userData }) => {
  const planRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate a mock 7-day plan based on the user data
  const days = Array.from({ length: 7 }, (_, i) => i + 1);
  
  // Calculate some personalized metrics with safe fallbacks
  const weight = parseFloat(userData?.weight) || 70;
  const height = parseFloat(userData?.height) || 170;
  const waterIntake = (weight * 35) / 1000; // 35ml per kg
  const anamnesisSnippet = userData?.anamnesis ? userData.anamnesis.substring(0, 30) : 'relatados';
  const goals = userData?.goals || 'Melhorar a visão geral';

  const handleDownloadPdf = async () => {
    if (!planRef.current) return;
    setIsGenerating(true);
    
    // Add class to body to force hex colors instead of oklch for html2canvas
    document.body.classList.add('pdf-exporting');
    
    try {
      // Wait a tick for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(planRef.current, { 
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('plano-tratamento-visao.pdf');
    } catch (error) {
      console.error('Error generating PDF', error);
    } finally {
      document.body.classList.remove('pdf-exporting');
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 mt-12 relative"
    >
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-plan, #printable-plan * {
            visibility: visible;
          }
          #printable-plan {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            box-shadow: none;
            border: none;
          }
          .no-print {
            display: none !important;
          }
        }

        /* Override oklch colors for html2canvas compatibility */
        :global(.pdf-exporting) #printable-plan,
        .pdf-exporting #printable-plan {
          --color-white: #ffffff !important;
          --color-blue-50: #eff6ff !important;
          --color-blue-100: #dbeafe !important;
          --color-blue-300: #93c5fd !important;
          --color-blue-500: #3b82f6 !important;
          --color-blue-600: #2563eb !important;
          --color-blue-800: #1e40af !important;
          --color-blue-900: #1e3a8a !important;
          --color-amber-50: #fffbeb !important;
          --color-amber-100: #fef3c7 !important;
          --color-amber-500: #f59e0b !important;
          --color-amber-700: #b45309 !important;
          --color-amber-900: #78350f !important;
          --color-orange-50: #fff7ed !important;
          --color-orange-100: #ffedd5 !important;
          --color-orange-500: #f97316 !important;
          --color-orange-700: #c2410c !important;
          --color-orange-900: #7c2d12 !important;
          --color-indigo-50: #eef2ff !important;
          --color-indigo-100: #e0e7ff !important;
          --color-indigo-500: #6366f1 !important;
          --color-indigo-700: #4338ca !important;
          --color-indigo-900: #312e81 !important;
          --color-gray-50: #f9fafb !important;
          --color-gray-100: #f3f4f6 !important;
          --color-gray-300: #d1d5db !important;
          --color-gray-500: #6b7280 !important;
          --color-gray-800: #1f2937 !important;
          --color-gray-900: #111827 !important;
        }

        .pdf-exporting .bg-white { background-color: #ffffff !important; }
        .pdf-exporting .bg-blue-600 { background-color: #2563eb !important; }
        .pdf-exporting .text-white { color: #ffffff !important; }
        .pdf-exporting .text-blue-600 { color: #2563eb !important; }
        .pdf-exporting .text-blue-900 { color: #1e3a8a !important; }
        .pdf-exporting .bg-blue-50 { background-color: #eff6ff !important; }
        .pdf-exporting .border-blue-100 { border-color: #dbeafe !important; }
        .pdf-exporting .text-blue-500 { color: #3b82f6 !important; }
        .pdf-exporting .text-blue-800 { color: #1e40af !important; }
        .pdf-exporting .bg-amber-50 { background-color: #fffbeb !important; }
        .pdf-exporting .text-amber-500 { color: #f59e0b !important; }
        .pdf-exporting .text-amber-700 { color: #b45309 !important; }
        .pdf-exporting .text-amber-900 { color: #78350f !important; }
        .pdf-exporting .border-amber-100 { border-color: #fef3c7 !important; }
        .pdf-exporting .bg-orange-50 { background-color: #fff7ed !important; }
        .pdf-exporting .text-orange-500 { color: #f97316 !important; }
        .pdf-exporting .text-orange-700 { color: #c2410c !important; }
        .pdf-exporting .text-orange-900 { color: #7c2d12 !important; }
        .pdf-exporting .border-orange-100 { border-color: #ffedd5 !important; }
        .pdf-exporting .bg-indigo-50 { background-color: #eef2ff !important; }
        .pdf-exporting .text-indigo-500 { color: #6366f1 !important; }
        .pdf-exporting .text-indigo-700 { color: #4338ca !important; }
        .pdf-exporting .text-indigo-900 { color: #312e81 !important; }
        .pdf-exporting .border-indigo-100 { border-color: #e0e7ff !important; }
        .pdf-exporting .bg-gray-50 { background-color: #f9fafb !important; }
        .pdf-exporting .bg-gray-100 { background-color: #f3f4f6 !important; }
        .pdf-exporting .text-gray-300 { color: #d1d5db !important; }
        .pdf-exporting .text-gray-500 { color: #6b7280 !important; }
        .pdf-exporting .text-gray-800 { color: #1f2937 !important; }
        .pdf-exporting .text-gray-900 { color: #111827 !important; }
        .pdf-exporting .border-gray-100 { border-color: #f3f4f6 !important; }
        .pdf-exporting .hover\\:border-blue-300:hover { border-color: #93c5fd !important; }
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 no-print">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Plano Gerado com Sucesso!
          </h2>
          <p className="text-gray-500 mt-2">Visualize seu plano abaixo e escolha como deseja salvá-lo.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors"
          >
            <Printer className="w-5 h-5" />
            Imprimir
          </button>
          <button 
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors disabled:opacity-70"
          >
            <Download className="w-5 h-5" />
            {isGenerating ? 'Gerando...' : 'Salvar PDF'}
          </button>
        </div>
      </div>

      <div id="printable-plan" ref={planRef} className="bg-white p-6 rounded-2xl border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              Seu Plano de 7 Dias
            </h2>
            <p className="text-gray-500 mt-2">Personalizado para {weight}kg • Foco: {goals}</p>
          </div>
          
          <div className="bg-blue-50 px-4 py-2 rounded-xl flex items-center gap-3 border border-blue-100">
            <Droplet className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase">Meta de Água</p>
              <p className="text-lg font-bold text-blue-900">{waterIntake.toFixed(1)}L / dia</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-8 gap-4 mb-4">
              <div className="col-span-1"></div>
              {days.map(day => (
                <div key={day} className="text-center">
                  <div className="bg-blue-600 text-white text-sm font-bold py-2 rounded-t-xl">
                    Dia {day}
                  </div>
                </div>
              ))}
            </div>

            {/* Morning Row */}
            <div className="grid grid-cols-8 gap-4 mb-4 items-stretch">
              <div className="col-span-1 flex flex-col items-center justify-center bg-amber-50 rounded-xl p-3 border border-amber-100">
                <Sun className="w-6 h-6 text-amber-500 mb-1" />
                <span className="text-sm font-bold text-amber-900">Manhã</span>
                <span className="text-xs text-amber-700">Jejum</span>
              </div>
              {days.map(day => (
                <div key={`morning-${day}`} className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-blue-300 transition-colors cursor-pointer group relative flex flex-col h-full">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                    <Circle className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2">Suco Pigmento Triplo</p>
                  <p className="text-xs text-gray-500 mt-1">250ml</p>
                  <p className="text-[10px] text-gray-400 mt-2 leading-tight">Regenera a retina e melhora a visão noturna.</p>
                </div>
              ))}
            </div>

            {/* Afternoon Row */}
            <div className="grid grid-cols-8 gap-4 mb-4 items-stretch">
              <div className="col-span-1 flex flex-col items-center justify-center bg-orange-50 rounded-xl p-3 border border-orange-100">
                <Clock className="w-6 h-6 text-orange-500 mb-1" />
                <span className="text-sm font-bold text-orange-900">Tarde</span>
                <span className="text-xs text-orange-700">Lanche</span>
              </div>
              {days.map(day => (
                <div key={`afternoon-${day}`} className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-blue-300 transition-colors cursor-pointer group relative flex flex-col h-full">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                    <Circle className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-800 mt-2">
                      {day % 2 === 0 ? 'Chá Verde' : 'Suco de Cenoura e Laranja'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {day % 2 === 0 ? '200ml' : '250ml'}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2 leading-tight">
                      {day % 2 === 0 ? 'Antioxidantes contra fadiga ocular.' : 'Vitamina C e A para proteção.'}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">Opcional</p>
                    <p className="text-xs text-gray-600">
                      {day % 2 === 0 ? '30g Mix de Castanhas' : '1/2 Mamão Papaia'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Night Row */}
            <div className="grid grid-cols-8 gap-4 items-stretch">
              <div className="col-span-1 flex flex-col items-center justify-center bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                <Moon className="w-6 h-6 text-indigo-500 mb-1" />
                <span className="text-sm font-bold text-indigo-900">Noite</span>
                <span className="text-xs text-indigo-700">Antes de dormir</span>
              </div>
              {days.map(day => (
                <div key={`night-${day}`} className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-blue-300 transition-colors cursor-pointer group relative flex flex-col h-full">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                    <Circle className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2">Descanso Visual</p>
                  <p className="text-xs text-gray-500 mt-1">Sem telas por 1h</p>
                  <p className="text-[10px] text-gray-400 mt-2 leading-tight">Relaxa os músculos ciliares e previne ressecamento.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-xl flex gap-3 items-start border border-blue-100">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>Nota:</strong> Este plano foi gerado com base nas suas informações (Peso: {weight}kg, Altura: {height}cm). 
              Lembre-se de manter a hidratação adequada e consultar um especialista se os sintomas ({anamnesisSnippet}...) persistirem.
            </p>
            <p>
              <strong>Sobre os sólidos:</strong> O foco deste tratamento é a terapia através de <strong>líquidos e sucos</strong>. Os alimentos sólidos sugeridos (como castanhas e frutas) são excelentes complementos vitamínicos para a visão, mas são totalmente <strong>opcionais</strong>.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
