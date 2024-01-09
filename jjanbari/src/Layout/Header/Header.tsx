// src/Layout/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserHeader from './User/UserHeader';
import AdminHeader from './Admin/AdminHeader';

const Header = () => {
  const location = useLocation();
  const [header, setHeader] = useState(<UserHeader />);

  const adminPaths = ['/admin', '/productManagement', '/productUpload', '/productRemove', '/userManagement', '/orderHistory', '/statics']

  useEffect(() => {
    if (adminPaths.includes(location.pathname)) {
      setHeader(<AdminHeader />);
    } else {
      setHeader(<UserHeader />);
    }
  }, [location]);

  return <>{header}</>;
};

export default Header;
