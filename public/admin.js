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
    document.getElementById('content').innerHTML = `
        <h2>Welcome Admin ${id}!</h2>
        <button onclick="addProduct()">Add Product</button>
    `;
}

function addProduct() {
    // 이전 코드와 동일
}
