// src/pages/Payment/PaymentPage.tsx

const PaymentPage = () => {
  return (
    <div id="container">
      <h1>결제 페이지</h1>
      <div>
        <h2>받는 사람: </h2>
      </div>
      <div>
        <label>
          주소:
          <input type="text" />
        </label>
        <label>
          상세주소:
          <input type="text" />
        </label>
      </div>
      <div>
        <label>
          연락처:
          <input type="text" />
        </label>
      </div>
      <div>
        <h2>결제 상품</h2>
        <p>가격: </p>
        <p>수량: </p>
      </div>
      <div>
        <h2>총 가격:</h2>
      </div>
      <button>결제하기</button>
    </div>
  );
};

export default PaymentPage;
