import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../slices/userSlice';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
