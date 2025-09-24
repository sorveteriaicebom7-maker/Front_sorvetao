export interface Food {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  servings: number;
}