/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './components/AuthProvider';
import { LanguageProvider } from './i18n';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { RecipeLibrary } from './components/RecipeLibrary';
import { RecipeDetail } from './components/RecipeDetail';
import { CustomJuice } from './components/CustomJuice';
import { AIConsult } from './components/AIConsult';
import { EducationalGuide } from './components/EducationalGuide';
import { VisionDisorders } from './components/VisionDisorders';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'recipes') {
      setSelectedRecipeId(null);
    }
  };

  const renderContent = () => {
    if (selectedRecipeId) {
      return (
        <RecipeDetail 
          recipeId={selectedRecipeId} 
          onBack={() => setSelectedRecipeId(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'recipes':
        return <RecipeLibrary onSelectRecipe={setSelectedRecipeId} onNavigate={setActiveTab} />;
      case 'custom':
        return <CustomJuice />;
      case 'consult':
        return <AIConsult />;
      case 'guide':
        return <EducationalGuide />;
      case 'vision':
        return <VisionDisorders />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange}>
      {renderContent()}
    </Layout>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}


