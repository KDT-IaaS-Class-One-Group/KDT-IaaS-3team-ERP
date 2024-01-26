// src/pages/Admin/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import { UserProfiles } from '../interface/interface';

const AdminPage = () => {
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
      <h1>관리자 페이지</h1>
      <div className="statistics-tables">
        <div className="user-statistics">
          <h3>회원 목록</h3>
          <table>
            <thead>
              <tr>
                <th>아이디</th>
                <th>회원이름</th>
                <th>이메일</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_num}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>user@example.com</td>
                  <td>010-0000-0000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="payment-statistics">
          <h3>최근 주문 목록</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
