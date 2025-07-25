import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Alert, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUser } from '../../store/authAsync';
import { changePassword } from '../../store/authAsync';

import btnStyles from '../../style/ButtonStyle';
import inputStyles from '../../components/UI/input/TextInput/TextInputStyle';
import { format, } from 'date-fns';
import { ru } from 'date-fns/locale';

const schema = yup.object().shape({
  oldPassword: yup.string().required('Старый пароль обязателен'),
  newPassword: yup
    .string()
    .min(6, 'Новый пароль должен быть минимум 6 символов')
    .matches(/^\S+$/, 'Пароль не может состоять из пробелов')
    .required('Новый пароль обязателен'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
});

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage = () => {
  const { user, isAuthenticated, changePasswordStatus, changePasswordError, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (changePasswordStatus === 'succeeded') {
      setOpenSnackbar(true);
      // Убираем редирект, оставляем только уведомление
      timer = setTimeout(() => {
        setOpenSnackbar(false);
        dispatch({ type: 'auth/resetChangePassword' }); // Сбрасываем статус
      }, 2000);
    }
    return () => clearTimeout(timer); // Очищаем таймер
  }, [changePasswordStatus, dispatch]);


  const onSubmit = (data: FormData) => {
    dispatch(changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword }));
  };

  if (loading || (!user && isAuthenticated)) {
    return <Typography>Loading...</Typography>;
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (!user) {
    return <Typography>Failed to load user data</Typography>;
  }

  const formattedDate = format(new Date(user.createdAt), 'dd MMMM yyyy года', { locale: ru });

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom={true}>Данные профиля</Typography>
      <Typography>Эл. почта: {user.email}</Typography>
      <Typography>Возраст: {user.age || 'Не указан'}</Typography>
      <Typography>Дата регистрации: {formattedDate}</Typography>
      <Typography variant="h6" mt={4}>Смена пароля</Typography>
      {changePasswordError && <Alert severity="error">{changePasswordError}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
        <TextField
          label="Текущий пароль"
          type="password"
          {...register('oldPassword')}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          sx={inputStyles.textInput}
        />
        <TextField
          label="Новый пароль"
          type="password"
          {...register('newPassword')}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          sx={inputStyles.textInput}
        />
        <TextField
          label="Подтверждение пароля"
          type="password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={inputStyles.textInput}
        />
        <Button
          type="submit"
          disabled={changePasswordStatus === 'loading'}
          color="inherit"
          variant="contained"
          sx={{ ...btnStyles.addBtn, mt: 4 }}
        >
          Сменить пароль
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Пароль успешно изменен"
      />
    </div>
  );
};

export default ProfilePage;
