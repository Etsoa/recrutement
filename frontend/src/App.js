import React, { useState, useEffect } from 'react';
import './App.css';
import { getUsers } from './api/userApi';
import Header from './components/Header';
import UserList from './components/UserList';

function App() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setMessage(data.message);
        setUsers(data.users || []);
      } catch (error) {
        setMessage('Hello World from Frontend! (Backend not connected)');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <h1>Hello World Application</h1>
        <p>{message}</p>
        <UserList users={users} />
      </main>
    </div>
  );
}

export default App;
