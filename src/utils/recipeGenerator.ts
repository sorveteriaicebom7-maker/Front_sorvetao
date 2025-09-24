import { Food } from '../types';

interface RecipeTemplate {
  title: string;
  baseIngredients: string[];
  instructions: string[];
  prepTime: string;
  servings: number;
  category: string;
}

const recipeTemplates: RecipeTemplate[] = [
  {
    title: 'Omelete Especial',
    baseIngredients: ['ovo', 'ovos'],
    instructions: [
      'Bata os ovos em uma tigela com sal e pimenta a gosto',
      'Adicione os demais ingredientes picados',
      'Aqueça uma frigideira antiaderente em fogo médio',
      'Despeje a mistura na frigideira',
      'Cozinhe por 3-4 minutos até dourar embaixo',
      'Dobre ao meio e sirva quente'
    ],
    prepTime: '15 minutos',
    servings: 2,
    category: 'café da manhã'
  },
  {
    title: 'Salada Fresca',
    baseIngredients: ['alface', 'tomate', 'pepino', 'cenoura'],
    instructions: [
      'Lave bem todos os vegetais',
      'Corte os vegetais em pedaços pequenos',
      'Misture todos os ingredientes em uma saladeira',
      'Tempere com azeite, vinagre, sal e pimenta',
      'Misture bem e sirva imediatamente'
    ],
    prepTime: '10 minutos',
    servings: 4,
    category: 'salada'
  },
  {
    title: 'Sanduíche Natural',
    baseIngredients: ['pão', 'pães'],
    instructions: [
      'Corte o pão ao meio ou use fatias',
      'Espalhe um pouco de manteiga ou maionese se disponível',
      'Adicione os recheios disponíveis',
      'Tempere com sal e pimenta a gosto',
      'Feche o sanduíche e corte ao meio se desejar'
    ],
    prepTime: '5 minutos',
    servings: 2,
    category: 'lanche'
  },
  {
    title: 'Vitamina Nutritiva',
    baseIngredients: ['banana', 'maçã', 'leite', 'iogurte'],
    instructions: [
      'Descasque e corte as frutas em pedaços',
      'Coloque todos os ingredientes no liquidificador',
      'Bata por 1-2 minutos até ficar cremoso',
      'Prove e adicione mel se quiser adoçar',
      'Sirva gelado em copos altos'
    ],
    prepTime: '5 minutos',
    servings: 2,
    category: 'bebida'
  },
  {
    title: 'Macarrão Simples',
    baseIngredients: ['macarrão', 'massa'],
    instructions: [
      'Ferva água abundante com sal em uma panela grande',
      'Adicione o macarrão e cozinhe conforme instruções da embalagem',
      'Enquanto isso, prepare os demais ingredientes',
      'Escorra o macarrão e refogue com os outros ingredientes',
      'Tempere com sal, pimenta e ervas se disponível',
      'Sirva quente'
    ],
    prepTime: '20 minutos',
    servings: 3,
    category: 'prato principal'
  },
  {
    title: 'Sopa Caseira',
    baseIngredients: ['batata', 'cenoura', 'aipo', 'cebola'],
    instructions: [
      'Descasque e corte todos os vegetais em cubos pequenos',
      'Refogue a cebola em uma panela com um pouco de óleo',
      'Adicione os demais vegetais e refogue por mais 2 minutos',
      'Cubra com água e deixe ferver',
      'Cozinhe até os vegetais ficarem macios (cerca de 15-20 minutos)',
      'Tempere com sal, pimenta e ervas a gosto',
      'Sirva quente'
    ],
    prepTime: '30 minutos',
    servings: 4,
    category: 'sopa'
  }
];

export const generateRecipe = (foods: Food[]) => {
  if (foods.length === 0) {
    return null;
  }

  // Normalizar nomes dos alimentos para comparação
  const availableIngredients = foods.map(food => food.name.toLowerCase().trim());
  
  // Encontrar um template que combine com os ingredientes disponíveis
  let bestTemplate: RecipeTemplate | null = null;
  let maxMatches = 0;

  for (const template of recipeTemplates) {
    const matches = template.baseIngredients.filter(ingredient => 
      availableIngredients.some(available => 
        available.includes(ingredient.toLowerCase()) || 
        ingredient.toLowerCase().includes(available)
      )
    );

    if (matches.length > maxMatches) {
      maxMatches = matches.length;
      bestTemplate = template;
    }
  }

  // Se não encontrou nenhum template específico, criar uma receita genérica
  if (!bestTemplate || maxMatches === 0) {
    return {
      title: 'Prato Especial da Casa',
      ingredients: foods.map(food => `${food.quantity} ${food.unit} de ${food.name.toLowerCase()}`),
      instructions: [
        'Prepare todos os ingredientes, lavando e cortando conforme necessário',
        'Aqueça uma frigideira ou panela em fogo médio',
        'Comece pelos ingredientes que demoram mais para cozinhar',
        'Adicione temperos como sal, pimenta e ervas a gosto',
        'Cozinhe até todos os ingredientes estarem no ponto desejado',
        'Prove e ajuste o tempero se necessário',
        'Sirva quente e aproveite sua criação culinária!'
      ],
      prepTime: '25 minutos',
      servings: foods.length >= 4 ? 4 : 2
    };
  }

  // Personalizar o template escolhido com os ingredientes disponíveis
  const recipeIngredients = foods.map(food => 
    `${food.quantity} ${food.unit} de ${food.name.toLowerCase()}`
  );

  return {
    title: bestTemplate.title,
    ingredients: recipeIngredients,
    instructions: bestTemplate.instructions,
    prepTime: bestTemplate.prepTime,
    servings: bestTemplate.servings
  };
};