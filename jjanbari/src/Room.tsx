import React from "react";
import { NumberLiteralType } from "typescript";

interface Class {
  instructor: string;
  field: string;
  computers: number;
  students: string[];
}

const Room = ({ instructor, field, computers, students }: Class) => {
  return (
    <div>
      <p>instructor: {instructor}</p>
      <p>field: {field}</p>
      <p>computers: {computers}</p>
      <p>students: {students}</p>
    </div>
  );
};
