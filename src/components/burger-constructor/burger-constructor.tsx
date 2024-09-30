import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  orderApi,
  resetOrder,
  selectConstructorItems,
  selectOrderModalData,
  setOrderModalData
} from '../../services/slices/orderSlice';
import store, { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const selectconstructorItems = useSelector(selectConstructorItems);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [makeOrder, { isLoading, data, isSuccess }] =
    orderApi.useMakeOrderMutation();

  const constructorItems = {
    bun: selectconstructorItems.bun || null,
    ingredients: selectconstructorItems.ingredients
  };

  const onOrderClick = async () => {
    if (!constructorItems.bun || isLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const order = constructorItems.ingredients.map((item) => item._id);
    order.push(constructorItems.bun._id);
    order.unshift(constructorItems.bun._id);

    await makeOrder(order).then((res: any) => {
      dispatch(setOrderModalData(res.data?.order));
    });
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    console.log(data);
    console.log(isSuccess);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      isLoading={isLoading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
