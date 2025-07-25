import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormContainer from '../../components/UI/formContainer/FormContainer';
import { TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { registerUser } from '../../store/authAsync';
import { type RegisterData } from '../../types/authData';
import btnStyles from '../../style/ButtonStyle';
import inputStyles from '../../components/UI/input/TextInput/TextInputStyle';

const schema = yup.object().shape({
  email: yup.string().email('Неверный email').required('Email обязателен'),
  password: yup.string()
    .min(6, 'Пароль должен состоять минимум из 6 символов')
    .matches(/^\S+$/, 'Пароль не может состоять из пробелов')
    .required('Пароль обязателен'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Пароль обязателен'),

  age: yup
    .number()
    .positive()
    .typeError('Возраст должен быть числом')
    .min(13, 'Возраст должен быть не менее 13 лет')
    .required('Возраст обязателен')
});

type FormInputs = RegisterData;

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormInputs) => {
    setServerError(null);
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate('/');
    } catch (error) {
      setServerError(error as string || 'Неизвестная ошибка регистрации');
    }
  };

  return (
    <FormContainer title="Регистрация">
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
        <TextField
          label="Подтверждение Пароля"
          type="password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={inputStyles.textInput}
        />
        <TextField
          label="Возраст"
          type="number"
          {...register('age')}
          error={!!errors.age}
          helperText={errors.age?.message}
          sx={inputStyles.textInput}
        />
        <Button type="submit" sx={btnStyles.addBtn} color='inherit'>
          Зарегистрироваться
        </Button>
      </form>
    </FormContainer>
  );
};

export default RegisterForm;
