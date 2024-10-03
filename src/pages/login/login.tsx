import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import {
  loginUser,
  setIsAuth,
  useFetchUserQuery,
  useLoginUserMutation,
  userApi
} from '../../services/slices/userSlice';
import { setCookie } from '../../utils/cookie';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const handleSubmit = (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   dispatch(loginUser({ email, password }));
  // };
  const [loginUser, { data, isSuccess, isLoading }] = useLoginUserMutation();
  const { refetch: refetchUser } = useFetchUserQuery();
  // const navigate = useNavigate();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    loginUser({ email, password });
    // .unwrap()
    // .then((data) => {
    //   setCookie('accessToken', data.accessToken);
    //   localStorage.setItem('refreshToken', data.refreshToken);
    //   dispatch(userApi.endpoints.fetchUser.initiate());
    // });
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (isSuccess && data) {
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    // dispatch(userApi.endpoints.fetchUser.initiate());
    refetchUser();
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
