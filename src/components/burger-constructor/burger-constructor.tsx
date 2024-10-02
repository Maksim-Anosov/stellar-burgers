import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  orderApi,
  resetOrder,
  selectConstructorItems
} from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUser, useFetchUserQuery } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const selectconstructorItems = useSelector(selectConstructorItems);
  // const user = useSelector(selectUser);
  const { data: user } = useFetchUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [makeOrder, { isLoading, data, isSuccess }] =
    orderApi.useMakeOrderMutation();
  const [showSuccessModal, setShowSuccessModal] = useState(isSuccess);

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

    await makeOrder(order);
    setShowSuccessModal(!showSuccessModal);
  };

  const closeOrderModal = () => {
    if (isSuccess) {
      dispatch(resetOrder());
      setShowSuccessModal(!showSuccessModal);
    } else {
      setShowSuccessModal(!showSuccessModal);
    }
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
      orderModalData={data?.order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      showSuccessModal={showSuccessModal}
    />
  );
};
