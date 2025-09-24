import React, { useState } from 'react';
import { ArrowLeft, BookOpen, ChefHat, Clock, Users, Utensils } from 'lucide-react';
import { Food } from '../types';
import { generateRecipe } from '../utils/recipeGenerator';
import { ConfirmModal } from './ConfirmModal';

interface RecipePageProps {
  foods: Food[];
  onBack: () => void;
}

export const RecipePage: React.FC<RecipePageProps> = ({ foods, onBack }) => {
  const [currentRecipe, setCurrentRecipe] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleGenerateRecipe = () => {
    if (foods.length === 0) {
      return;
    }

    setIsGenerating(true);
    
    // Simular um pequeno delay para melhorar a experiência do usuário
    setTimeout(() => {
      const recipe = generateRecipe(foods);
      setCurrentRecipe(recipe);
      setIsGenerating(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Voltar</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-white" />
                <h2 className="text-xl font-bold text-white">Gerador de Receitas</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Seus Ingredientes Disponíveis
                </h3>
                
                {foods.length === 0 ? (
                  <div className="py-12">
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Utensils className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg mb-6">
                      Você ainda não tem ingredientes na sua geladeira.
                    </p>
                    <p className="text-gray-500">
                      Adicione alguns alimentos primeiro para gerar receitas incríveis!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {foods.map((food) => (
                        <span
                          key={food.id}
                          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {food.quantity} {food.unit} de {food.name}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={handleGenerateRecipe}
                      disabled={isGenerating}
                      className={`bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center space-x-3 ${
                        isGenerating ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Gerando Receita...</span>
                        </>
                      ) : (
                        <>
                          <ChefHat className="h-6 w-6" />
                          <span>Gerar Receita Especial</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {currentRecipe && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <ChefHat className="h-6 w-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Sua Receita</h3>
                </div>
              </div>

              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {currentRecipe.title}
                  </h2>
                  
                  <div className="flex justify-center items-center space-x-6 text-gray-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>{currentRecipe.prepTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>{currentRecipe.servings} porções</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                      <span className="bg-blue-100 p-2 rounded-lg">
                        <Utensils className="h-5 w-5 text-blue-600" />
                      </span>
                      <span>Ingredientes</span>
                    </h4>
                    <ul className="space-y-2">
                      {currentRecipe.ingredients.map((ingredient: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                      <span className="bg-green-100 p-2 rounded-lg">
                        <BookOpen className="h-5 w-5 text-green-600" />
                      </span>
                      <span>Modo de Preparo</span>
                    </h4>
                    <ol className="space-y-4">
                      {currentRecipe.instructions.map((instruction: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 leading-relaxed">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-2 text-orange-800 mb-2">
                    <ChefHat className="h-5 w-5" />
                    <span className="font-semibold">Dica do Chef</span>
                  </div>
                  <p className="text-orange-700">
                    Sinta-se livre para ajustar as quantidades e adicionar temperos de sua preferência. 
                    A culinária é uma arte, e cada chef tem seu toque especial!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showSuccessModal}
        type="success"
        title="Receita Gerada com Sucesso!"
        message="Sua receita personalizada foi criada com base nos ingredientes disponíveis na sua geladeira. Que tal experimentar?"
        onCancel={() => setShowSuccessModal(false)}
        cancelText="Fechar"
      />
    </div>
  );
};