import React, { useState, useEffect } from 'react';
import { UserProfiles } from '../../interface/interface';


const UserProfilesPage = () => {
  const [users, setUsers] = useState<UserProfiles[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        // data가 배열인지 확인 후 상태 업데이트
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Error: Fetched data is not an array.');
          setUsers([]); // 또는 다른 초기값 설정
        }
      } catch (error: any) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div id="container">
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>아이디</th>
            <th>회원이름</th>
            <th>이메일</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_num}>
              <td>{user.user_num}</td>
              <td>{user.user_id}</td>
              <td>{user.user_name}</td>
              <td>user@example.com</td>
              <td>010-0000-0000</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfilesPage;
