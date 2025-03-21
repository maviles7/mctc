import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as postService from '../../services/postService';

export default function AmigoPostListPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userPosts = await postService.getAmigoPosts(userId);
      setPosts(userPosts);

    };
    fetchUserPosts();
  }, [userId]);

  const username = posts[0]?.owner?.username || '';

  return (
    <div>
      <h1>{username ? `${username}` : 'loading...' }</h1>
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