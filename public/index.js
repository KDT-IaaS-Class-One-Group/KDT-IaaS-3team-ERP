async function postData(event) {

  event.preventDefault();
  const key = document.getElementById('key').value;

  const data = {
      key: key
  };

  const response = await fetch('http://localhost:8080/postdata', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  if (response.ok) {
      window.location.href = 'result.html'; // POST 성공 시 결과 페이지로 이동
  } else {
      alert('Failed to submit data');
  }
}