document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        displayUserPage(id);
    } else {
        alert('Invalid access. Please log in.');
        window.location.href = 'index.html';
    }
});

function displayUserPage(id) {
    document.getElementById('content').innerHTML = `<h2>Welcome ${id}!</h2>`;
    // 사용자 페이지에 필요한 내용을 추가할 수 있습니다.
}

// 추가된 부분: 상품 표시 함수
function displayProducts(products) {
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
}

// 서버에서 상품 정보 가져와서 표시
fetch('/getProducts')
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    });
