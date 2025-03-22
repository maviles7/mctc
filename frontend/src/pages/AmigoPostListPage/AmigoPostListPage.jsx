import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as postService from '../../services/postService';
import * as amigoService from '../../services/amigoService';

export default function AmigoPostListPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  // const [isAmigoAdded, setIsAmigoAdded] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userPosts = await postService.getAmigoPosts(userId);
      setPosts(userPosts);

    };
    fetchUserPosts();
  }, [userId]);

  // const handleAddAmigo = async () => {
  //   try {
  //     await amigoService.addAmigo(userId); // Call the service function to add amigo
  //     setIsAmigoAdded(true); // Update the state to indicate amigo is added
  //   } catch (error) {
  //     console.error('Error adding amigo:', error);
  //   }
  // };

  const username = posts[0]?.owner?.username || '';

  return (
    <div>
      <h1>{username ? `${username}` : 'loading...' }</h1>
      {/* <button onClick={handleAddAmigo}>add amigo.</button> */}
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>no posts, yet.</p> 
      )}
    </div>
  );
}