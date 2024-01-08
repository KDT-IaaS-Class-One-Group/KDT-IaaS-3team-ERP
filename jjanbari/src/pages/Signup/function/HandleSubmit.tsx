// src/pages/Signup/function/HandleSubmit.tsx

const handleSubmit = (formData: any, navigate: any) => async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!formData.userID || !formData.userPW || !formData.userNAME) {
    alert('모든 필수 항목을 입력해주세요.');
    return;
  }
  try {
    // 서버로 회원 가입 정보 전송
    const response = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: formData.userID,
        userPW: formData.userPW,
        userNAME: formData.userNAME,
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
