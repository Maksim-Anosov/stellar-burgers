import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrders,
  fetchOrder,
  selectOrder,
  selectOrders,
  feedApi
} from '../../services/slices/feedSlice';
import { useParams } from 'react-router-dom';
import {
  ingredientsApi,
  selectIngredients
} from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  // const ingredients: TIngredient[] = useSelector(selectIngredients).ingredients;
  const number = Number(useParams().number);
  const { data: dataIngredients } = ingredientsApi.useGetIngredientsQuery();
  const { data: dataOrder } = feedApi.useFetchOrderQuery(number);
  const ingredients = dataIngredients?.data;
  // const dispatch = useDispatch();
  // const orderData = useSelector(selectOrder);
  const orderData = dataOrder?.orders[0];

  // useEffect(() => {
  //   dispatch(fetchOrder(number));
  // }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients?.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
