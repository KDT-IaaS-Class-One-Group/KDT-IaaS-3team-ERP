function Login() {
  return (
    <div className="Login">
      <h2>로그인 하세요</h2>
      <form action="/" method="get">
        <input type="text" name="name" placeholder="이름"></input>
        <input type="text" name="id" placeholder="아이디"></input>
        <input type="password" name="password" placeholder="비밀번호"></input>
        <input type="submit" value="로그인"></input>
      </form>
      <form action="/admin" method="post">
        <input type="submit" value="관리자 페이지 로그인"></input>
      </form>
      <button id="signUpPageButton">회원가입</button>
    </div>
  )
} 

export default Login;