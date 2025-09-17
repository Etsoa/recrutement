import React from 'react';

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <h3>No users found</h3>
        <p>Connect to backend to see users</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Users List</h3>
      <ul>
        {users.map((user, index) => (
          <li key={user.id || index} style={{ margin: '10px 0' }}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
