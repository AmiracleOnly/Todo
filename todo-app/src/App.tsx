import {Routes, Route} from 'react-router-dom'
import RegisterForm from './pages/RegisterForm/RegisterForm';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';
import { AppWrapper } from './style/appStyle';
import Navbar from './components/UI/NavBar/NavBar'
import LoginForm from './pages/LoginForm/LoginForm';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute  from './components/ProtectedRoute/ProtectedRoute'



const App = () => {

  return(
    <ThemeProvider>
      <AppWrapper>
        <Navbar />
        <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='*' element={<NotFoundPage />} />
          <Route path='/register' element={<RegisterForm />}/>
          <Route path='/login' element={<LoginForm />}/>
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
