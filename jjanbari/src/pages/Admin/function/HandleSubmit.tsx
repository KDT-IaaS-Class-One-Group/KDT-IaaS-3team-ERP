// src/pages/Admin/function/HandleSubmit.tsx

const handleSubmit = (name: string, price: string, quantity: number, img: File | null, navigate: any) => async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!name || !price || !quantity || !img) {
    alert('빈칸을 채워서 제출해주세요');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity.toString());
    formData.append('img', img as Blob);

    const API_URL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${API_URL}/addProducts`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      alert('상품이 등록되었습니다');
      navigate('/admin');
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
