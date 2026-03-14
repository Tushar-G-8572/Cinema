import React from 'react'
import './features/shared/styles/global.scss';
import { RouterProvider } from 'react-router';
import router from './auth.routes';
import { ToastContainer, toast } from 'react-toastify'
import { AuthProvider } from './features/auth/auth.context';
import { MovieProvider } from './features/movie/movie.context';

const App = () => {
  return (
    <AuthProvider>
      <MovieProvider>
        <RouterProvider router={router} />
      </MovieProvider>
      <ToastContainer theme='dark' />
    </AuthProvider>
  )
}

export default App