import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { items: ingredients } = useSelector((state) => state.ingredientsSlice);
  /** TODO: взять переменную из стора */
  const ingredientData = ingredients.find((items) => items._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
