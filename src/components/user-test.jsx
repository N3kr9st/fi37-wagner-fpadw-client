import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://api-test.mshome.net:3001/user');

        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Fehler beim Abrufen:', err);
        setError('Fehler beim Laden der Benutzerdaten');
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Benutzerliste</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 bg-gray-100 rounded shadow">
            <div><strong>ID:</strong> {user.userID}</div>
            <div><strong>Name:</strong> {user.username}</div>
            <div><strong>Email:</strong> {user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;