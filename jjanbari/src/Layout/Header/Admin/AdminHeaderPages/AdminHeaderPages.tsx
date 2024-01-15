import './AdminHeaderPages.css'
import AdminSideHeaderPages from '../AdminSideHeaderPages/AdminSideHeaderPages';

const AdminHeaderPages = () => {

  return (
    <div className="adminHeaderPages">
      <a href="/productManagement" className='productManagement'>상품 관리</a>
      <a href="/userManagement">유저 관리</a>
      <a href="/statistics">통계 처리</a>     
      <a href="/" className='main'>메인 페이지로</a> 
    </div>
  );
};

export default AdminHeaderPages;
