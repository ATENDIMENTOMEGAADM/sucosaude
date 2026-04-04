import React from 'react';
import { useLanguage } from '../i18n';
import { AlertTriangle, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-amber-50/50">
          <div className="flex items-center gap-3 text-amber-700">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-xl font-bold">{t('disclaimer.title')}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-gray-700 leading-relaxed">
          <p>{t('disclaimer.p1')}</p>
          <p>{t('disclaimer.p2')}</p>
          
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 space-y-4">
            <p><strong>{t('disclaimer.allergies').split(':')[0]}:</strong> {t('disclaimer.allergies').split(':')[1]}</p>
            <p><strong>{t('disclaimer.anticoagulants').split(':')[0]}:</strong> {t('disclaimer.anticoagulants').split(':')[1]}</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            {t('disclaimer.close')}
          </button>
        </div>

      </div>
    </div>
  );
};
