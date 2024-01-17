import './AdminSideHeaderPages.css'

const AdminSideHeaderPages = () => {

  return (
    <ul className='productSidebar'>
      <li>
        <a href="/productUpload">상품 등록</a>
      </li>
      <li>
        <a href="/productUpdate">상품 수정</a>        
      </li>
    </ul>
  );
};

export default AdminSideHeaderPages;
