import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { PrivateRoute } from '../../routes/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import {
  fetchUser,
  useFetchUserQuery,
  userApi
} from '../../services/slices/userSlice';
import { deleteCookie } from '../../utils/cookie';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  // const [data] = useFetchUserQuery();
  // useEffect(() => {
  //   // dispatch(fetchUser());
  //   deleteCookie('accessToken');
  //   dispatch(userApi.endpoints.fetchUser.initiate());
  // }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <PrivateRoute onlyUnAuth>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PrivateRoute onlyUnAuth>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <PrivateRoute onlyUnAuth>
              <ForgotPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PrivateRoute onlyUnAuth>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <PrivateRoute>
              <ProfileOrders />
            </PrivateRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Заказ'
                onClose={() => {
                  navigate(backgroundLocation);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate(backgroundLocation);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <PrivateRoute>
                <Modal
                  title='Информаци по заказу'
                  onClose={() => navigate(backgroundLocation)}
                >
                  <OrderInfo />
                </Modal>
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
