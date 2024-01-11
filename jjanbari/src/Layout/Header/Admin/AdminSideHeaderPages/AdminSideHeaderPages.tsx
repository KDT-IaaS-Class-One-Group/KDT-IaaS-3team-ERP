import './AdminSideHeaderPages.css'

const AdminSideHeaderPages = () => {

  return (
    <div className="adminSideHeaderPages">
      <a href="/productManagement">상품 관리</a>
      <a href="/userManagement">유저 관리</a>
      <a href="/statistics">통계 처리</a>     
    </div>
  );
};

export default AdminSideHeaderPages;
