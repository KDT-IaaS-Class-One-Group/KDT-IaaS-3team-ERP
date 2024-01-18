// 카테고리를 표시하는 컴포넌트
import { Link } from 'react-router-dom';
import './HeaderCategory.css'


const HeaderCategory = () => {
  return (
    <div className="headerCategory">
      <Link to="cat">
        고양이
      </Link>
      <Link to="dog">
        강아지
        </Link>
    </div>
  );
};

export default HeaderCategory;
