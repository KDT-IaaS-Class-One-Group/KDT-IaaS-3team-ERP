import './AdminHeaderPages.css'

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
        <li>
          <a href="/" className='main'>메인 페이지로</a> 
        </li>
      </ul>
    </div>
  );
};

export default AdminHeaderPages;
