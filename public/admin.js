document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        displayAdminPage(id);
    } else {
        alert('Invalid access. Please log in.');
        window.location.href = 'index.html';
    }
});

function displayAdminPage(id) {
    document.getElementById('productsContainer').innerHTML = `
        <h2>Welcome ${id}!</h2>
    `;
}

// 추가된 부분: 상품 등록 함수
window.addProduct = function() {
    const imageInput = document.getElementById('imageInput');
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;

    // 이미지 업로드 및 상품 정보 서버로 전송
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('name', productName);
    formData.append('description', productDescription);

    fetch('/addProduct', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // 서버에서 JSON 형식으로 응답하도록 수정
    .then(products => {
        // 등록된 상품 정보를 유저 페이지에 업데이트
        displayUserPage(products);
    })
    .catch(error => {
        console.error(error);
        // 에러 메시지 표시 등 추가적인 처리
    });
};
