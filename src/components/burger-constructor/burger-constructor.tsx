import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  makeOrder,
  orderApi,
  resetOrder,
  selectConstructorItems,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const selectconstructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [makeOrder, { isLoading, data }] = orderApi.useMakeOrderMutation();

  const constructorItems = {
    bun: selectconstructorItems.bun || null,
    ingredients: selectconstructorItems.ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || isLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const order = constructorItems.ingredients.map((item) => item._id);
    order.push(constructorItems.bun._id);
    order.unshift(constructorItems.bun._id);
    // dispatch(makeOrder(order));

    makeOrder(order);
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
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
      orderRequest={isLoading}
      constructorItems={constructorItems}
      orderModalData={data?.order}
      orderReset={selectconstructorItems.orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
