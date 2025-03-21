import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as amigoService from '../../services/amigoService';


export default function AmigoListPage() {
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
          <li key={user._id}>
            <Link to={`/amigos/${user._id}/posts`}>{user.username}</Link> 
          </li>
        ))}
      </ul>
    </div>
  );
}