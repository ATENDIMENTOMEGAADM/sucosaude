import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { Search, Filter, Eye, Leaf, Clock, ChefHat, Sparkles } from 'lucide-react';

interface RecipeLibraryProps {
  onSelectRecipe: (recipeId: string) => void;
  onNavigate: (tab: string) => void;
}

export const RecipeLibrary: React.FC<RecipeLibraryProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // The user will send more cards later. For now, we have one card.
  const themeCards = [
    {
      id: 'vision',
      title: t('vision.title'), // "Transtornos da Visão"
      theme: 'Bebidas para os olhos',
      description: 'Descubra sucos e vitaminas ricos em antioxidantes, luteína e zeaxantina para proteger sua visão e prevenir o envelhecimento ocular.',
      img: 'https://images.unsplash.com/photo-1622597467836-f38240662c8b?auto=format&fit=crop&w=800&q=80',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
      keywords: ['olhos', 'visão', 'vision', 'eyes', 'bebidas para os olhos'],
      prepTime: '10 min',
      difficulty: 'Fácil',
      benefits: ['Rico em Vitamina A', 'Antioxidantes']
    }
  ];

  const filters = [
    { id: 'all', label: 'Todos os Temas' },
    { id: 'Bebidas para os olhos', label: 'Bebidas para os olhos' }
  ];

  const filteredCards = themeCards.filter(card => {
    const matchesSearch = 
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || card.theme === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{t('recipes.title')}</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl">{t('recipes.subtitle')}</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t('recipes.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3.5 border-none rounded-2xl bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm transition-all"
          />
        </div>

        <div className="relative min-w-[220px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="block w-full pl-12 pr-10 py-3.5 border-none rounded-2xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm appearance-none cursor-pointer transition-all font-medium"
          >
            {filters.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{t('recipes.noRecipes')}</h3>
          <p className="text-gray-500 mt-2">{t('recipes.adjustSearch')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((card) => (
            <div 
              key={card.id} 
              onClick={() => onNavigate(card.id)}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
                
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2.5 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                  <div className={`${card.textColor}`}>
                    {card.icon}
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                  <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {card.theme}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-green-600 transition-colors">{card.title}</h3>
                <p className="text-gray-600 line-clamp-2 mb-6 flex-1">
                  {card.description}
                </p>
                
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 font-medium">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{card.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                      <ChefHat className="w-4 h-4 text-blue-500" />
                      <span>{card.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {card.benefits.map((benefit, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
                        <Sparkles className="w-3 h-3" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
