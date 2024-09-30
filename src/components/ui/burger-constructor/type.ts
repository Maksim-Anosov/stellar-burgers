import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  isLoading: boolean;
  price: number;
  orderModalData: TOrder | undefined;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
