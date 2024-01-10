import LoginToggle from './LoginStatus/LoginToggle';

const HeaderPages = () => {
  return (
    <div className="headerPages">
      <LoginToggle />
      <a href="/cart">장바구니</a>
      <a href="/like">좋아요</a>
      <a href="/mypage">마이페이지</a>
    </div>
  );
};

export default HeaderPages;
