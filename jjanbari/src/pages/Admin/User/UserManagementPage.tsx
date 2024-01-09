import { Link } from 'react-router-dom';

const UserManagementPage = () => {
  return (
    <div id="container">
      <Link to="/orderHistory">
        <h1>주문 내역 확인</h1>
      </Link>
    </div>
  );
};

export default UserManagementPage;
