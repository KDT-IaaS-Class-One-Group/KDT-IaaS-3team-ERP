const { log } = require('console');
const fs = require('fs');

const rawData = fs.readFileSync('test.json');
const data = JSON.parse(rawData);

//* 총 강의실 별 학생 수
//data 객체의 키(강의실 이름)들을 배열로 반환
// 각각 새로운 객체를 생성하는데 room과 studentCount 두개의 속성을 가진다.
const studentCounts = Object.keys(data).map((room) => ({
  room,
  studentCount: data[room].students.length,
}));

console.log('강의실별 학생 수:', studentCounts);

//* 전체 강의실 갯수 확인
// totalRooms는 data객체의 키인 강의실을 배열로 변환하고 길이(갯수)를 나타낸다.
const totalRooms = Object.keys(data).length;
console.log('전체 강의실 갯수:', totalRooms);

//* 전체 학생 수 확인

// studentCounts의 함수를 실행 하고 하나의 결과값 반환 ?
// 값을 누적하여 전체 학생수를 확인 할 수 있다.
const totalStudent = studentCounts.reduce((sum, room) => sum + room.studentCount, 0);
console.log('전체 학생수:', totalStudent);

//하나씩 순회하면서 콜백 함수를 실행
//이 콜백 함수는 현재까지 가장 학생 수가 많은 강의실 정보인 maxRoom과 현재 순회 중인 강의실 room을 비교하여 더 많은 학생이 있는 경우 room으로 갱신
const maxStudentRoom = studentCounts.reduce((maxRoom, room) => (room.studentCount > maxRoom.studentCount ? room : maxRoom), { studentCount: -1 });
//{ studentCount: -1 }이 주어져 있습니다. 이 초기값은 학생 수가 0 이상이라는 가정하에 설정되어있다.
console.log('가장 많은 학생이 있는 강의실:', maxStudentRoom.room, '학생 수:', maxStudentRoom.studentCount);
