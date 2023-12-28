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
