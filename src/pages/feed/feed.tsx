import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  feedApi,
  fetchOrders,
  selectOrders
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = useSelector(selectOrders);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [dispatch]);

  const { data, isLoading } = feedApi.useFetchOrdersQuery();

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={data?.orders}
      handleGetFeeds={() => {
        feedApi.util.resetApiState();
      }}
    />
  );
};
