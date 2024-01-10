// 카테고리를 표시하는 컴포넌트
import './HeaderCategory.css'


const HeaderCategory = () => {
  return (
    <div className="headerCategory">
      <a href='/dog'>고양이</a>
      <a href='/cat'>강아지</a>
    </div>
  );
};

export default HeaderCategory;
