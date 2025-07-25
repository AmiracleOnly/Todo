import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormContainer from '../../components/UI/formContainer/FormContainer';
import { AxiosError } from 'axios';
import { type ErrorResponse } from '../../types/ErrorType';
import { TextField, Button, Alert, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { login, fetchUser } from '../../store/authAsync';
import btnStyles from '../../style/ButtonStyle';
import inputStyles from '../../components/UI/input/TextInput/TextInputStyle';

const schema = yup.object().shape({
  email: yup.string().email('Неверный email').required('Email обязателен'),
  password: yup.string().min(6, 'Пароль должен состоять минимум из 6 символов').required('Пароль обязателен'),
});

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

    const onSubmit = async (data: FormData) => {
      console.log('Submitting login data:', data);
      setServerError(null);
      try {
        const loginResultAction = await dispatch(login(data));

        if (login.fulfilled.match(loginResultAction)) {
          const fetchUserResultAction = await dispatch(fetchUser());

          if (fetchUser.fulfilled.match(fetchUserResultAction)) {
            console.log('Fetching user after login successful');
            navigate('/');
          } else {
            console.error('Failed to fetch user after login:', fetchUserResultAction.payload);
          }
        } else {
          const errorMessage = (loginResultAction.payload as string) || 'Ошибка входа';
          console.error('Login error:', { message: errorMessage });
          setServerError(errorMessage === 'Invalid credentials' ? 'Неверный email или пароль' : errorMessage);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError.response?.data?.error || 'Ошибка входа';
        console.error('Login catch error:', { message: errorMessage, axiosError });
        setServerError(errorMessage === 'Invalid credentials' ? 'Неверный email или пароль' : errorMessage);
      }
    };

  return (
    <FormContainer title="Вход">
      {serverError && <Alert severity="error">{serverError}</Alert>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={inputStyles.textInput}
        />
        <TextField
          label="Пароль"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={inputStyles.textInput}
        />
        <Button type="submit" sx={btnStyles.addBtn} color='inherit'>
          Войти
        </Button>
        <Link component={RouterLink} to="/register" sx={{ textAlign: 'center' }}>
          Нет аккаунта? Зарегистрируйтесь
        </Link>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
