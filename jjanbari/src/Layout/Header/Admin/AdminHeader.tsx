// src/Component/Header/Admin/AdminHeader.tsx
import HeaderPages from '../User/HeaderPages/HeaderPages';
import HeaderLogo from '../User/HeaderLogo/HeaderLogo';
import HeaderCategory from '../User/HeaderCategory/HeaderCategory';
import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <header id="AdminHeader">
      <HeaderLogo />
      <HeaderCategory />
    </header>
  );
};

export default AdminHeader;
