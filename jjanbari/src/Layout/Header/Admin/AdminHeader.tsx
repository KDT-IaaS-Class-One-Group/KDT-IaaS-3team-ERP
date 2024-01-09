// src/Component/Header/Admin/AdminHeader.tsx

import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <div id="adminHeader">
      <a href="/productManagement">상품 관리</a>
      <a href="/userManagement">회원 관리</a>
      <a href="/statistics">통계 처리</a>
      <a href="/admin">관리자 페이지 로고</a>
    </div>
  );
};

export default AdminHeader;
