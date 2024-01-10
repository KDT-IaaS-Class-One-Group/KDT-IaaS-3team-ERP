import React, { useState, useEffect } from 'react';

type UserProfiles = {
  id: number;
  userID: string;
  userPW: string;
  userName: string;
};

const UserProfilesPage = () => {
  const [users, setUsers] = useState<UserProfiles[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/userprofiles');
      const data = await response.json();
      setUsers(data);
    } catch (error:any) {
      console.error('Error fetching users:', error.message);
    }
  };

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userID}</td>
              <td>{user.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfilesPage;
