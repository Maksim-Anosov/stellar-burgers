import { TOrder } from '@utils-types';

export type FeedUIProps = {
  orders: TOrder[] | undefined;
  handleGetFeeds: () => void;
};
