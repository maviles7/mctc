import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as postService from '../../services/postService';

export default function UserPostListPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userPosts = await postService.getAmigoPosts(userId);
      setPosts(userPosts);
    };
    fetchUserPosts();
  }, [userId]);

  return (
    <div>
      <h1>User's Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}