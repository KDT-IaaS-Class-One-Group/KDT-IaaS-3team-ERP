import "./HeaderPages.css";
import React, { Link, useNavigate } from "react-router-dom";

import { isLoggedIn } from "./LoginStatus/isLoggedIn";

const HeaderPages = () => {
  const navigate = useNavigate();
  return (
    <div className="headerPages">
      <div className="loginStatus">
      </div>
      <div className="pages">
        <Link
          to="/cart"
          onClick={(event) => {
            event.preventDefault();
            navigate(isLoggedIn() ? "/cart" : "/login");
          }}
        >
          장바구니
        </Link>
        <Link
          to="/like"
          onClick={(event) => {
            event.preventDefault();
            navigate(isLoggedIn() ? "/like" : "/login");
          }}
        >
          좋아요
        </Link>
        <Link
          to="/mypage"
          onClick={(event) => {
            event.preventDefault();
            navigate(isLoggedIn() ? "/mypage" : "/login");
          }}
        >
          마이페이지
        </Link>{" "}
      </div>
    </div>
  );
};

export default HeaderPages;
