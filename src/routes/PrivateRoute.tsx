import { Navigate, useLocation } from 'react-router-dom';
// import {
//   checkUserAuth,
//   getUserInfo,
//   isAuthCheckedSelector
// } from '../slices/userSlice';
import { useDispatch, useSelector } from '../services/store';

import { Preloader } from '@ui';
import { useEffect } from 'react';
import { ConstructorPage } from '@pages';

type PrivateRouteProps = {
  children?: React.ReactElement | React.ReactElement[];
  onlyUnAuth?: boolean;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = false;
  return auth ? <>{children}</> : <ConstructorPage />;
};

// export const ProtectedRoute = ({
//   onlyUnAuth,
//   children
// }: PrivateRouteProps) => {
//   const auth = false;
//   return auth ? <>{children}</> : <ConstructorPage />;
// const isAuthChecked = useSelector(isAuthCheckedSelector);
// const user = useSelector(getUserInfo);
// const dispatch = useDispatch();
// const location = useLocation();

// useEffect(() => {
//   dispatch(checkUserAuth());
// }, []);

// if (!isAuthChecked) {
//   return <Preloader />;
// }

// if (!onlyUnAuth && !user) {
//   return <Navigate replace to='/login' state={{ from: location }} />;
// }

// if (onlyUnAuth && user) {
//   // const from = location.state?.from || { pathname: '/' };
//   return <Navigate replace to='/' />;
// }

// return children;
// };
