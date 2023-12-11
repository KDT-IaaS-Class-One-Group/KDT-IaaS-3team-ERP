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
    document.getElementById('content').innerHTML = `<h2>Welcome User ${id}!</h2>`;
    // 사용자 페이지에 필요한 내용을 추가할 수 있습니다.
}
