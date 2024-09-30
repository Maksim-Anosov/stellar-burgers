import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  isLoading: boolean;
  price: number;
  orderModalData: TOrder | undefined;
  showSuccessModal: boolean;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
