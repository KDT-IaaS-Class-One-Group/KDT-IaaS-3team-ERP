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

window.addProduct = function() {
    const imageInput = document.getElementById('imageInput');
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;

    // 이미지 업로드 및 상품 정보 서버로 전송
    const formData = new FormData();
    formData.append('img', imageInput.files[0]);
    formData.append('name', productName);
    formData.append('description', productDescription);
    

    fetch('/addProduct', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(message => {
        // 등록 결과 메시지 표시
        document.getElementById('resultMessage').innerText = message;
        // 상품 목록 다시 표시
        displayProducts();
    });
};


function displayProducts() {
    fetch('/getProducts')
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById('productsContainer');
            productsContainer.innerHTML = '';

            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                `;
                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error(error);
            // 에러 메시지 표시 등 추가적인 처리
        });
}