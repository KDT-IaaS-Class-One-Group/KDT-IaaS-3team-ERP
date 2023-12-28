import React from "react";

const jsonFilePath = './data.json'
const jsonData = await fetch(jsonFilePath)
  .then((response) => response.text())
  .then((text) => JSON.parse(text));

console.log(jsonData);

// interface Classroom {
//   instructor: string;
//   field: string;
//   computers: number;
//   students: string[];
// }

// const Room = ({ instructor, field, computers, students }: Classroom) => {
//   return (
//     <div>
//       <p>instructor: {instructor}</p>
//       <p>field: {field}</p>
//       <p>computers: {computers}</p>
//       <p>students: {students}</p>
//     </div>
//   );
// };

function Room() {
  return (
    <div></div>
  )
}

export default Room;