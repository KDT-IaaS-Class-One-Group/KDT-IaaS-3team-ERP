import CartPage from './Cart/Cart';
import DeliveryPage from './Delivery/Delivery';
import LikePage from './Like/Like';
import OrderPage from './Order/Order';
import RecentPage from './Recent/Recent';
import WithdrawPage from './Withdraw/WithdrawPage';

const Mypage = () => {
  return (
    <div id="container">
      <h1>마이페이지</h1>
      <OrderPage />
      <LikePage />
      <DeliveryPage />
      <CartPage />
      <RecentPage />
      <WithdrawPage />
    </div>
  );
};

export default Mypage;
