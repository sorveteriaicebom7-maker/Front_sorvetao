import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { FridgePage } from './components/FridgePage';
import { RecipePage } from './components/RecipePage';
import { Food } from './types';

type Page = 'dashboard' | 'fridge' | 'recipe';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [foods, setFoods] = useState<Food[]>([
    {
      id: '1',
      name: 'Ovos',
      quantity: 12,
      unit: 'unidade(s)'
    },
    {
      id: '2',
      name: 'Leite',
      quantity: 1,
      unit: 'l'
    },
    {
      id: '3',
      name: 'Tomate',
      quantity: 3,
      unit: 'unidade(s)'
    },
    {
      id: '4',
      name: 'Queijo',
      quantity: 200,
      unit: 'g'
    }
  ]);

  const handleAddFood = (food: Omit<Food, 'id'>) => {
    const newFood: Food = {
      ...food,
      id: Date.now().toString()
    };
    setFoods(prev => [...prev, newFood]);
  };

  const handleEditFood = (id: string, updatedFood: Omit<Food, 'id'>) => {
    setFoods(prev => prev.map(food => 
      food.id === id ? { ...updatedFood, id } : food
    ));
  };

  const handleDeleteFood = (id: string) => {
    setFoods(prev => prev.filter(food => food.id !== id));
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Geladeira Inteligente" />
      
      {currentPage === 'dashboard' && (
        <Dashboard 
          onNavigate={(page) => navigateToPage(page)} 
        />
      )}

      {currentPage === 'fridge' && (
        <FridgePage
          foods={foods}
          onAddFood={handleAddFood}
          onEditFood={handleEditFood}
          onDeleteFood={handleDeleteFood}
          onBack={navigateToDashboard}
        />
      )}

      {currentPage === 'recipe' && (
        <RecipePage
          foods={foods}
          onBack={navigateToDashboard}
        />
      )}
    </div>
  );
}

export default App;