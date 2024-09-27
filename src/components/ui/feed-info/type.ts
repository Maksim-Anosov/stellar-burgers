export type FeedInfoUIProps = {
  feed: any;
  readyOrders: number[] | undefined;
  pendingOrders: number[] | undefined;
};

export type HalfColumnProps = {
  orders: number[] | undefined;
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
