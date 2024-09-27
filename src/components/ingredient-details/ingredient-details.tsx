import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import {
  ingredientsApi,
  selectIngredients
} from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  // const ingredientData = useSelector(selectIngredients).ingredients.find(
  //   (item) => item._id === useParams().id
  // );
  const { data } = ingredientsApi.useGetIngredientsQuery();

  const ingredientData = data?.data.find((item) => item._id === useParams().id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
