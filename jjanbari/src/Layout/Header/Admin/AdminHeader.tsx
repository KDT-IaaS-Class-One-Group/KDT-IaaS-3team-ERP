// src/Component/Header/Admin/AdminHeader.tsx

import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <div id="adminHeader">
      <a href="/admin">상품 관리</a>
      <a href="/login">회원 관리</a>
      <a href="/statics">통계 처리</a>
      <a href="/admin">관리자 페이지 로고</a>
    </div>
  );
};

export default AdminHeader;
