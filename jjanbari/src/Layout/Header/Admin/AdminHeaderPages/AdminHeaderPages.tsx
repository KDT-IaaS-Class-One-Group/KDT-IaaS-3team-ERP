import './AdminHeaderPages.css'
import AdminSideHeaderPages from '../AdminSideHeaderPages/AdminSideHeaderPages';

const AdminHeaderPages = () => {

  return (
    <div className="adminHeaderPages">
      <ul>
        <li>
          <a href="/productManagement" className='productManagement'>상품 관리</a>
        </li>
        <li>
          <a href="/userManagement">유저 관리</a>
        </li>
        <li>
          <a href="/statistics">통계 처리</a>       
        </li>
      </ul>
      <a href="/" className='main'>메인 페이지로</a> 
    </div>
  );
};

export default AdminHeaderPages;
