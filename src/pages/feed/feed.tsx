import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { feedApi } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const { data, isLoading, refetch } = feedApi.useFetchOrdersQuery();

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={data?.orders} handleGetFeeds={() => refetch()} />;
};
