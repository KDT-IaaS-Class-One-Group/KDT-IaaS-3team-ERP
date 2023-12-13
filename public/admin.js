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
        <form id="productForm">
            <input type="file" id="imageInput" accept="image/*">
            <input type="text" id="productName" placeholder="Product Name">
            <textarea id="productDescription" placeholder="Product Description"></textarea>
            <button type="button" id="addProductBtn">Add Product</button>
        </form>
        <div id="resultMessage"></div>
        <div id="productsContainer"></div>
    `;
    // 상품 목록 표시
    displayProducts();

    // 이벤트 리스너 등록
    document.getElementById('addProductBtn').addEventListener('click', addProduct);
}

// 상품 등록 함수
function addProduct() {
    const imageInput = document.getElementById('imageInput');
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;

    // 이미지 업로드 및 상품 정보 서버로 전송
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('name', productName);
    formData.append('description', productDescription);

    fetch('/addProduct', {
        method: 'POST',  // POST 메서드로 변경
        body: formData
    })
    .then(response => response.text())
    .then(message => {
        // 등록 결과 메시지 표시
        document.getElementById('resultMessage').innerText = message;
        // 상품 목록 다시 표시
        displayProducts();
    });
}

// 상품 목록 표시 함수
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
