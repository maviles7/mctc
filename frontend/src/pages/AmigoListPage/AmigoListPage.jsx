import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as amigoService from '../../services/amigoService';


export default function AmigoListPage() {
  const [users, setUsers] = useState([]);
  const [addedAmigos, setAddedAmigos] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await amigoService.index();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const handleAddAmigo = async (amigoId) => {
    try {
      await amigoService.addAmigo(amigoId); // Pass amigoId to the service function
      setAddedAmigos((prev) => [...prev, amigoId]); // Add amigoId to the addedAmigos state
    } catch (error) {
      console.error('Error adding amigo:', error);
    }
  };

  return (
    <div>
       <h1>Amigos</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/amigos/${user._id}/posts`}>{user.username}</Link> 
            <button
              onClick={() => handleAddAmigo(user._id)} // Pass the user's _id to handleAddAmigo
              disabled={addedAmigos.includes(user._id)} // Disable button if amigo is already added
            >
              {addedAmigos.includes(user._id) ? 'already amigos.' : 'add amigos.'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}