import { Link } from 'react-router-dom';
import './HeaderLogo.css';

const HeaderLogo = () => {
  return (
    <div className="headerLogo">
      <Link to="/">
        <div className="logoImage"></div>
      </Link>{' '}
      {/* 실제 로고 이미지나 텍스트로 교체하세요 */}
    </div>
  );
};

export default HeaderLogo;
