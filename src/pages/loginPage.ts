document.getElementById('loginForm')!.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = (document.getElementById('id') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  if (!id || !password) {
    alert('빈칸을 채워서 제출해주세요');
    return;
  }

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    });

    const result: { success: boolean; error?: string } = await response.json();

    if (result.success) {
      alert('로그인 되었습니다');
      window.location.href = '/';
    } else {
      alert(result.error || '로그인에 실패하였습니다');
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    alert('로그인에 실패하였습니다');
  }
});
