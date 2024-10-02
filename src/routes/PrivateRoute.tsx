import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';
import {
  selectIsAuth,
  selectUser,
  useFetchUserQuery
} from '../services/slices/userSlice';

type PrivateRouteProps = {
  children?: React.ReactElement | React.ReactElement[];
  onlyUnAuth?: boolean;
};

export const PrivateRoute = ({ children, onlyUnAuth }: PrivateRouteProps) => {
  // const isAuth = useSelector(selectIsAuth);
  // const user = useSelector(selectUser);
  const location = useLocation();
  const { data, isLoading } = useFetchUserQuery();
  // if (!isAuth) {
  //   return <Preloader />;
  // }
  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !data?.user) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && data?.user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
