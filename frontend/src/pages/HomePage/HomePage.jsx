import { Link } from "react-router-dom"; 
import { useState } from "react";
import * as closetService from "../../services/closetService";

export default function HomePage({ posts, user }) {
  const [addedToCloset, setAddedToCloset] = useState([]);

  const handleAddToCloset = async (postId) => {
    try {
      await closetService.addItem(postId); // Call the service function
      setAddedToCloset((prev) => [...prev, postId]); // Update state to track added posts
    } catch (error) {
      console.error('Error adding post to closet:', error);
    }
  };

  return (
    <>
    {user ? (
      <div>
        <h1>mctc</h1>
        <ul>
        {posts
          .map((post) => (
            <li key={post._id}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
              <button
                onClick={() => handleAddToCloset(post._id)} // Add post to closet
                disabled={addedToCloset.includes(post._id)} // Disable button if already added
              >
                {addedToCloset.includes(post._id) ? 'Added to Closet' : 'Add to Closet'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <h1>Welcome to Mi Closet Ti Closet</h1>
    )}
    </>
  )
};
