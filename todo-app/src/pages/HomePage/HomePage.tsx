import { useAppSelector } from '../../store/hooks';
import {  Link } from '@mui/material';
import {  Link as RouterLink } from 'react-router-dom';
import TodoList from '../../components/TodoList/TodoList';


const HomePage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
<div>
  {isAuthenticated ? (
    <>
      {user ? (
        <>
          <p>С возвращением, {user.email}!</p>
          <TodoList />
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </>
  ) : (
    <p>
      Пожалуйста, <Link component={RouterLink} to="/login">войдите</Link> или{' '}
      <Link component={RouterLink} to="/register">зарегистрируйтесь</Link>.
    </p>
  )}
</div>
  );
};

export default HomePage;
