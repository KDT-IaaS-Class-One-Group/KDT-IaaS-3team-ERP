import { Link } from 'react-router-dom';
import './AdminHeaderPages.css';
import AdminSideHeaderPages from './AdminSideHeaderPages/ProductSidebar';

const AdminHeaderPages = () => {
  return (
    <div className="adminHeaderPages">
      <ul>
        <li>
          <div className="productManagement">
            상품 관리
          </div>
          <AdminSideHeaderPages />
        </li>
        <li>
          <Link to="/userManagement">유저 관리</Link>
        </li>
        <li>
          <Link to="/admin">통계 처리</Link>
        </li>
      </ul>
      <Link to="/" className="main">
        메인 페이지로
      </Link>
    </div>
  );
};

export default AdminHeaderPages;
