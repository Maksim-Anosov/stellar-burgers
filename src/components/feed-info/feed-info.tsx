import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { feedApi } from '../../services/slices/feedSlice';

const getOrders = (
  orders: TOrder[] | undefined,
  status: string
): number[] | undefined =>
  orders
    ?.filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { data } = feedApi.useFetchOrdersQuery();
  const orders: TOrder[] | undefined = data?.orders;
  const feed = {
    total: data?.total,
    totalToday: data?.totalToday
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
