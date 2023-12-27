// adminPage.ts

document.getElementById('productForm')!.addEventListener('submit', async (event) => {
  event.preventDefault();

  const productName = (document.getElementById('productName') as HTMLInputElement).value;
  const productPrice = (document.getElementById('productPrice') as HTMLInputElement).value;
  const productQuantity = (document.getElementById('productQuantity') as HTMLInputElement).value;

  if (!productName || !productPrice || !productQuantity) {
    alert('빈칸을 채워서 제출해주세요');
    return;
  }

  try {
    const response = await fetch('/addProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, productPrice, productQuantity }),
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
