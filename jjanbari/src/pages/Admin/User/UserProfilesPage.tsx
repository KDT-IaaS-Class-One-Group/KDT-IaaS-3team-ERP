import { Link } from 'react-router-dom';

const UserProfilesPage = () => {
  return (
    <div id="container">
      <Link to="/userProfiles">
        <h1>주문 내역 확인</h1>
      </Link>
    </div>
  );
};

export default UserProfilesPage;
