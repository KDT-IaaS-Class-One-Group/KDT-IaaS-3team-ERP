function login() {
  const id = document.getElementById('id').value;
  const password = document.getElementById('password').value;

  if (id === 'adroot' && password === '1234') {
    window.location.href = `admin.html?id=${id}`;
  } else if (id === 'root' && password === '1234') {
    window.location.href = `user.html?id=${id}`;
  } else {
    alert('Invalid credentials. Please try again.');
  }
}
