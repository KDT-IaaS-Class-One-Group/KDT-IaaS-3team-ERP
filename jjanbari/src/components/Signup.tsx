function Signup() {
  return (
  <div>
    <h2>회원가입 하세요</h2>
      <form action="/signup" method="post">
      <input type="text" name="name" placeholder="이름"></input>
      <input type="text" name="id" placeholder="아이디"></input>
      <input type="password" name="password" placeholder="비밀번호"></input>
      <input type="submit" value="회원가입"></input>
  </form>
  </div>
  )
}

export default Signup;