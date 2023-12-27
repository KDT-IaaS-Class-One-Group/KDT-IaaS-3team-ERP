// adminPage.ts

document.getElementById('productForm')!.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = (document.getElementById('name') as HTMLInputElement).value;
  const price = (document.getElementById('price') as HTMLInputElement).value;
  const quantity = (document.getElementById('quantity') as HTMLInputElement).value;

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

    const result: { success: boolean; error?: string } = await response.json();

    if (result.success) {
      alert('상품이 등록되었습니다');
      // 추가로 필요한 동작 수행 (예: 등록한 상품 목록 새로고침)
    } else {
      alert(result.error || '상품 등록에 실패하였습니다');
    }
  } catch (error) {
    console.error('Error during product registration:', error.message);
    alert('상품 등록에 실패하였습니다');
  }
});
