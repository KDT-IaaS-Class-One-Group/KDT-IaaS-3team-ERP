const handleSubmit = (name: string, price: string, quantity: number, navigate: any) => async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!name || !price || !quantity) {
    alert('빈칸을 채워서 제출해주세요');
    return;
  }

  try {
    const response = await fetch('/addProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, quantity }),
    });

    const result = await response.json();

    if (result.success) {
      alert('상품이 등록되었습니다');
      navigate('/');
      // 추가로 필요한 동작 수행 (예: 등록한 상품 목록 새로고침)
    } else {
      alert(result.error || '상품 등록에 실패하였습니다');
    }
  } catch (error: any) {
    console.error('상품 등록 중 오류 발생:', error.message);
    alert('상품 등록에 실패하였습니다');
  }
};

export default handleSubmit;
