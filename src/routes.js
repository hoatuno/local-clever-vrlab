import React, { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Context from './context';
// layouts
import Main from './components/layout/Main';
// pages
import Login from './pages/Login';
import Schools from './pages/Schools';
// ----------------------------------------------------------------------

const Demo = () => {
  return <div>test</div>;
};

export default function Router() {
  const { token } = useContext(Context);

  let isLoggedIn = false;
  if (token) {
    isLoggedIn = true;
  }
  return useRoutes([
    {
      path: '/',
      element: isLoggedIn ? <Main /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/schools" replace /> },
        { path: 'subjects', element: <Demo /> },
        { path: 'teachers', element: <Demo /> },
        { path: 'pupils', element: <Demo /> },
        { path: 'classes', element: <Demo /> },
        { path: 'labs', element: <Demo /> },
        { path: 'admins', element: <Demo /> },
        { path: 'schools', element: <Schools /> },
      ],
    },
    {
      path: '/',
      element: <Login />,
      children: [
        { path: 'login', element: <Login /> },
      ]
    },
    {
      path: '*',
      element: !isLoggedIn && <Navigate to="/login" />,
    }

  ]);
}
