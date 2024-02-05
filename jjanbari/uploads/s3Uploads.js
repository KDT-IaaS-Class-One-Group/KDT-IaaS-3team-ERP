// uploads/s3Uploads.js

/**
** uploadFile 함수는 파일 업로드를 담당함
 * 
 * 1. HTML 문서에서 'fileInput' 요소를 가져와 선택된 파일을 확인
 * 2. 파일이 선택된 경우, FormData를 생성하고 선택된 파일을 추가
 * 3. fetch 함수를 사용하여 서버의 업로드 엔드포인트('http://localhost:3002/upload')로 POST 요청을 전송
 * 4. 서버 응답을 처리하고, 성공 또는 에러 메시지를 콘솔에 출력하고 사용자에게 알림을 표시
 * 5. 파일이 선택되지 않은 경우, 에러를 콘솔에 출력하고 사용자에게 알림을 표시
 */

/** 
** 이미지 객체 렌더링 원리
** 이미지 객체 URL의 형식: https://<버킷명>.s3.<리전명>.amazonaws.com/<경로>/<파일명>
 * 
*? 만약, 업로드한 파일명이 pet-food-dog.jpg라면?
 * 임베드할 이미지 객체 URL은, https://forteam3.s3.ap-northeast-2.amazonaws.com/uploads/pet-food-dog.jpg입니다.
 */

function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3002/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      alert('파일 업로드 성공: ' + data);
    })
    .catch(error => {
      console.error('에러 발생:', error);
      alert('파일 업로드 중 에러 발생.');
    });
  } else {
    console.error('파일을 선택하세요.');
    alert('파일을 선택하세요.');
  }
}
