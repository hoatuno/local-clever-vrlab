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

  let isLoggedIn = true;
  if (token) {
    isLoggedIn = true;
  }
  return useRoutes([
    {
      path: '/',
      element: isLoggedIn ? <Main /> : <Navigate to="/login" />,
      children: [
        // { element: <Navigate to="/Subjects" replace /> },
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
      // element: <LogoOnlyLayout />,
      children: [
        {
          path: 'login',
          element: isLoggedIn ? <Navigate to="/Subjects" replace /> : <Login />,
        },
        { path: '/', element: <Navigate to="/login" /> },
      ],
    },
  ]);
}
