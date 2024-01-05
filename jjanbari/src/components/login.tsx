function Login() {

  function signupClick() {
    window.location.href="/signup"
  }

  return (
    <div className="Login">
      <h2>로그인 하세요</h2>
      <form action="/">
        <input type="text" name="userNAME" placeholder="이름"></input>
        <input type="text" name="userID" placeholder="아이디"></input>
        <input type="password" name="userPW" placeholder="비밀번호"></input>
        <input type="submit" value="로그인"></input>
      </form>
      <form action="/admin">
        <input type="submit" value="관리자 페이지 로그인"></input>
      </form>
      <button id="signUpPageButton" onClick={signupClick}>회원가입</button>
    </div>
  )
} 

export default Login;