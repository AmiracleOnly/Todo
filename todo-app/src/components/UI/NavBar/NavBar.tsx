import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import { logout } from '../../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation(); // Для определения текущего маршрута

  const handleLogout = () => {
    dispatch(logout());
    console.log('Logout dispatched');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Todo by Amir
        </Typography>
        {isAuthenticated ? (
          <>
            {location.pathname === '/profile' ? (
              <Button component={Link} to="/" color="inherit" sx={{ mr: 1 }}>
                <Typography sx={{ mr: 1 }}>Todo</Typography>
                <ListIcon />
              </Button>
            ) : (
              <Button component={Link} to="/profile" color="inherit" sx={{ mr: 1 }}>
                <Typography sx={{ mr: 1 }}>Профиль</Typography>
                <AccountCircleIcon />
              </Button>
            )}
            <Button onClick={handleLogout} color="inherit">
              <Typography sx={{ mr: 1 }}>Выйти</Typography>
              <LogoutIcon />
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/register" color="inherit" sx={{ mr: 1 }}>
              <Typography sx={{ mr: 1 }}>Регистрация</Typography>
              <HowToRegIcon />
            </Button>
            <Button component={Link} to="/login" color="inherit">
              <Typography sx={{ mr: 1 }}>Войти</Typography>
              <LoginIcon />
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
