// src/Layout/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserHeader from './User/UserHeader';
import AdminHeader from './Admin/AdminHeader';

const Header = () => {
  const location = useLocation();
  const [header, setHeader] = useState(<UserHeader />);

  useEffect(() => {
    if (location.pathname === '/admin') {
      setHeader(<AdminHeader />);
    } else {
      setHeader(<UserHeader />);
    }
  }, [location]);

  return <>{header}</>;
};

export default Header;
