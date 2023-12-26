document.getElementById('signupForm')!.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = (document.getElementById('id') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  const name = (document.getElementById('name') as HTMLInputElement).value;

  if (!id || !password || !name) {
    alert('빈칸을 채워서 제출해주세요');
    return;
  }

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password, name }),
    });

    const result: { success: boolean; error?: string } = await response.json();

    if (result.success) {
      alert('제출 되었습니다');
      window.location.href = '/login';
    } else {
      alert(result.error || '회원가입에 실패하였습니다');
    }
  } catch (error) {
    console.error('Error during signup:', error.message);
    alert('회원가입에 실패하였습니다');
  }
});
