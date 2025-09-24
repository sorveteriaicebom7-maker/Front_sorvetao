import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Refrigerator } from 'lucide-react';
import { Food } from '../types';
import { FoodModal } from './FoodModal';
import { ConfirmModal } from './ConfirmModal';

interface FridgePageProps {
  foods: Food[];
  onAddFood: (food: Omit<Food, 'id'>) => void;
  onEditFood: (id: string, food: Omit<Food, 'id'>) => void;
  onDeleteFood: (id: string) => void;
  onBack: () => void;
}

export const FridgePage: React.FC<FridgePageProps> = ({
  foods,
  onAddFood,
  onEditFood,
  onDeleteFood,
  onBack
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | undefined>();
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    foodId?: string;
    foodName?: string;
  }>({ isOpen: false });

  const handleAddFood = (food: Omit<Food, 'id'>) => {
    onAddFood(food);
    setIsModalOpen(false);
  };

  const handleEditFood = (food: Omit<Food, 'id'>) => {
    if (editingFood) {
      onEditFood(editingFood.id, food);
      setEditingFood(undefined);
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (food: Food) => {
    setConfirmModal({
      isOpen: true,
      foodId: food.id,
      foodName: food.name
    });
  };

  const handleConfirmDelete = () => {
    if (confirmModal.foodId) {
      onDeleteFood(confirmModal.foodId);
    }
    setConfirmModal({ isOpen: false });
  };

  const openAddModal = () => {
    setEditingFood(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (food: Food) => {
    setEditingFood(food);
    setIsModalOpen(true);
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

          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Adicionar Alimento</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center space-x-3">
              <Refrigerator className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold text-white">Minha Geladeira</h2>
            </div>
          </div>

          {foods.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Refrigerator className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Sua geladeira está vazia
              </h3>
              <p className="text-gray-600 mb-6">
                Adicione alguns alimentos para começar a gerar receitas incríveis!
              </p>
              <button
                onClick={openAddModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center space-x-2 transition-all transform hover:scale-105"
              >
                <Plus className="h-5 w-5" />
                <span>Adicionar Primeiro Alimento</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Alimento
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Quantidade
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Medida
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {foods.map((food) => (
                    <tr key={food.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-medium">{food.name}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {food.quantity}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {food.unit}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(food)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
                            title="Editar alimento"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(food)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                            title="Excluir alimento"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <FoodModal
        isOpen={isModalOpen}
        food={editingFood}
        onSave={editingFood ? handleEditFood : handleAddFood}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFood(undefined);
        }}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        type="danger"
        title="Excluir Alimento"
        message={`Tem certeza que deseja excluir "${confirmModal.foodName}" da sua geladeira? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false })}
        confirmText="Sim, excluir"
        cancelText="Cancelar"
      />
    </div>
  );
};