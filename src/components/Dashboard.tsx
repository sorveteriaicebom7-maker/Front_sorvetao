import React from 'react';
import { Refrigerator, BookOpen } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: 'fridge' | 'recipe') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Olá, tudo bem?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gerencie os alimentos da sua geladeira e descubra receitas incríveis 
            com os ingredientes que você tem em casa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div
            onClick={() => onNavigate('fridge')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105"
          >
            <div className="p-8 text-center">
              <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Refrigerator className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Minha Geladeira
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Adicione, edite e gerencie todos os alimentos da sua geladeira de forma simples e organizada.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('recipe')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105"
          >
            <div className="p-8 text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <BookOpen className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Gerar Receita
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Descubra receitas deliciosas baseadas nos ingredientes disponíveis na sua geladeira.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};