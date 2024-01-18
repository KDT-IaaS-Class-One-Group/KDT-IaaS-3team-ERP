// test/ProfileForm.tsx

import React, { useState } from "react";

const ProfileForm: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 데이터를 서버로 보냄
    try {
      const response = await fetch("http://localhost:5000/addProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, email }),
      });

      if (response.ok) {
        console.log("Profile added successfully");
      } else {
        console.error("Failed to add profile");
      }
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  return (
    <div id="test">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="age">나이:</label>
        <input
          type="number"
          id="age"
          name="age"
          required
          onChange={(e) => setAge(parseInt(e.target.value, 10))}
        />
        <br />
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit">프로필 추가</button>
      </form>
    </div>
  );
};

export default ProfileForm;
