import { useState, useEffect } from 'react';
import * as amigoService from '../../services/amigoService';

export default function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await amigoService.index();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Amigos</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}