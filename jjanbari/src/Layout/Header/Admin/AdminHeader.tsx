// src/Component/Header/Admin/AdminHeader.tsx
import HeaderLogo from '../User/HeaderLogo/HeaderLogo';
import AdminHeaderPages from './AdminHeaderPages/AdminHeaderPages';
import AdminSideHeaderPages from './AdminSideHeaderPages/AdminSideHeaderPages';

import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <header id="AdminHeader">
      <HeaderLogo />
      <AdminHeaderPages />
    </header>
  );
};

export default AdminHeader;
