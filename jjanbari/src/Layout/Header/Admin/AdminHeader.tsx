// src/Component/Header/Admin/AdminHeader.tsx

import { Link } from 'react-router-dom';
import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <div id="adminHeader">
      <Link to="/productManagement">상품 관리</Link>
      <Link to="/userManagement">회원 관리</Link>
      <Link to="/statistics">통계 처리</Link>
      <Link to="/admin">관리자 페이지 로고</Link>
    </div>
  );
};

export default AdminHeader;
