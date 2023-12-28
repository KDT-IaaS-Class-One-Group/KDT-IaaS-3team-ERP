import React from "react";

interface Classroom {
  instructor: string;
  field: string;
  computers: number;
  students: string[];
}

const Room = ({ instructor, field, computers, students }: Classroom) => {
  return (
    <div>
      <p>instructor: {instructor}</p>
      <p>field: {field}</p>
      <p>computers: {computers}</p>
      <p>students: {students}</p>
    </div>
  );
};

export default Room;