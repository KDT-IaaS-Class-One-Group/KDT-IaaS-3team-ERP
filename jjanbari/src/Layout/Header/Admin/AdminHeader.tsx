// src/Component/Header/Admin/AdminHeader.tsx
import HeaderLogo from '../User/HeaderLogo/HeaderLogo';
import AdminHeaderPages from './AdminHeaderPages/AdminHeaderPages';

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
