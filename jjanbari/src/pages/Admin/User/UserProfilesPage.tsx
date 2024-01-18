import React, { useState, useEffect } from 'react';
import './UserProfilesPage.css'

type UserProfiles = {
  id: number;
  userID: string;
  userPW: string;
  userNAME: string;
};

const UserProfilesPage = () => {
  const [users, setUsers] = useState<UserProfiles[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
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
            <th>UserID</th>
            <th>UserName</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userID}</td>
              <td>{user.userNAME}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfilesPage;
