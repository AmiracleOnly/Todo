import {  type JSX } from "react";
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUser } from '../../store/authAsync';

const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error, user } = useAppSelector((state) => state.auth);
  console.log('ProtectedRoute: isAuthenticated =', isAuthenticated, 'loading =', loading, 'error =', error, 'user =', user);

  useEffect(() => {
    if (isAuthenticated && !user && !loading) {
      console.log('ProtectedRoute: Fetching user');
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated, user, loading]);

  if (loading) {
    console.log('ProtectedRoute: Showing loading state');
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Redirecting to /login: isAuthenticated is false');
    return <Navigate to="/login" />;
  }

  console.log('ProtectedRoute: Rendering children');
  return children;
};

export default ProtectedRoute;
