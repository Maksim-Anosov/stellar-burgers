import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser, useFetchUserQuery } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const { data, isLoading } = useFetchUserQuery();

  // return <AppHeaderUI userName={useSelector(selectUser)?.name} />;
  return <AppHeaderUI userName={data?.user.name} isLoading={isLoading} />;
};
