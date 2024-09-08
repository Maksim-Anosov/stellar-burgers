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
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';

import { AppHeader, Modal, OrderInfo } from '@components';
import { PrivateRoute } from '../../routes/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { getIngredientsApi } from '@api';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <PrivateRoute>
              <ForgotPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PrivateRoute>
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
        </Routes>
      )}
    </div>
  );
};

export default App;
