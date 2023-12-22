// admin.js 파일
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

function displayProducts() {
  fetch('/getProducts')
    .then((response) => response.json())
    .then((products) => {
      const productsContainer = document.getElementById('productsContainer');
      productsContainer.innerHTML = '';

      products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            `;
        productsContainer.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error(error);
      // 에러 메시지 표시 등 추가적인 처리
    });
}

function displayAdminPage(id) {
  document.getElementById('productsContainer').innerHTML = `
        <h2>Welcome ${id}!</h2>
        <form id="productForm">
            <input type="file" id="imageInput" name="image" accept="image/*">
            <input type="text" id="productName" name="name" placeholder="Product Name">
            <textarea id="productDescription" name="description" placeholder="Product Description"></textarea>
            <button type="button" id="addProductBtn">Add Product</button>
        </form>
        <div id="resultMessage"></div>
        <div id="productsContainer"></div>
    `;
  displayProducts();

  document.getElementById('addProductBtn').addEventListener('click', addProduct);
}

function addProduct() {
  const formData = new FormData(document.getElementById('productForm'));

  fetch('/addProduct', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)), // FormData를 JSON으로 변환
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((message) => {
      document.getElementById('resultMessage').innerText = message;
      displayProducts();
    });
}
