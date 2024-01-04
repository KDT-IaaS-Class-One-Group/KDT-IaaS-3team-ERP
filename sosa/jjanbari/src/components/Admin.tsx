function Admin() {

  function productClick() {
    window.location.href="/product"
  }

  return (
  <div>
    <h2>관리자용 페이지입니다.</h2>
    <button id="productUploadPageButton" onClick={productClick}>상품 등록</button>
  </div>
  )
}

export default Admin;