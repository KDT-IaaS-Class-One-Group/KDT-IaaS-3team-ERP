import React, { ChangeEvent } from "react";

const handleInputChange = (setLoginFormData: React.Dispatch<React.SetStateAction<{ userID: string; userPW: string }>>) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
};

export default handleInputChange;
