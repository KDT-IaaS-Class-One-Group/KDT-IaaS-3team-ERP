// src/pages/Signup/function/HandleSubmit.tsx

const handleSubmit = (User: any, navigate: any) => async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!User.user_id || !User.user_pw || !User.user_name) {
    alert('모든 필수 항목을 입력해주세요.');
    return;
  }
  try {
    // 서버로 회원 가입 정보 전송
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: User.user_id,
        userPW: User.user_pw,
        userNAME: User.user_name,
      }),
    });

    if (response.ok) {
      alert('회원 가입이 완료되었습니다');
      navigate('/');
    } else {
      alert('회원 가입에 실패하였습니다');
    }
  } catch (error: any) {
    console.error('회원 가입 중 오류 발생:', error.message);
    alert('회원 가입에 실패하였습니다');
  }
};
export default handleSubmit;
