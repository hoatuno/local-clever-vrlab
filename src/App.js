import React from 'react';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Router from './routes';
import Context from './context';

import 'antd/dist/antd.css';
import './assets/styles/main.css';
import './assets/styles/responsive.css';

import { ConfirmProvider } from './provider/Confirm';

const App = () => {
  const [token, setToken] = useState(null);
  const [idSchool, setIdSchool] = useState(null);
  const [schoolName, setSchoolName] = useState(null);
  const [username, setUsername] = useState('Guest');
  const [title, setTitle] = useState(null);
  const [role, setRole] = useState('guest');
  const [locale, setLocale] = useState('vi-VN');

  useEffect(() => {
    if (!token) {
      let tk = window.localStorage.getItem('token');
      if (tk) {
        setToken(tk);
        const { username } = jwtDecode(tk);
        setUsername(username);
      }
    }
  }, [token]);

  return (
    <div className="App">
      <Context.Provider
        value={{
          token,
          locale,
          username,
          idSchool,
          schoolName,
          title,
          role,
          updateContext: ({
            token,
            idSchool,
            schoolName,
            title,
            username,
            role,
            locale,
          }) => {
            if (token !== undefined) {
              if (token) localStorage.setItem('token', token);
              else localStorage.removeItem('token');
              setToken(token);
            }
            if (idSchool !== undefined) setIdSchool(idSchool);
            if (schoolName !== undefined) setSchoolName(schoolName);
            if (title !== undefined) setTitle(title);
            if (username !== undefined) setUsername(username);
            if (role !== undefined) setRole(role);
            if (locale !== undefined) setLocale(locale);
          },
        }}
      >
        <ConfirmProvider>
          <Router />
        </ConfirmProvider>
      </Context.Provider>
    </div>
  );
};

export default App;
