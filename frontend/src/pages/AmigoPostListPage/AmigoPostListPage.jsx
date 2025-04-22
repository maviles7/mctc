import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as postService from "../../services/postService";
import * as amigoService from "../../services/amigoService";

export default function AmigoPostListPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isAmigoAdded, setIsAmigoAdded] = useState(false); // State to track if amigo is added
  const [isAmigoDeleted, setIsAmigoDeleted] = useState(false); // State to track if amigo is deleted

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userPosts = await postService.getAmigoPosts(userId);
      setPosts(userPosts);
    };
    fetchUserPosts();
  }, [userId]);

  const handleAddAmigo = async () => {
    try {
      await amigoService.addAmigo(userId); // Call the service function to add amigo
      setIsAmigoAdded(true); // Update the state to indicate amigo is added
    } catch (error) {
      console.error("Error adding amigo:", error);
    }
  };

  const handleDeleteAmigo = async () => {
    try {
      await amigoService.deleteAmigo(userId); // Call the service function to delete amigo
      setIsAmigoDeleted(true); // Update the state to indicate amigo is deleted
    } catch (error) {
      console.error("Error deleting amigo:", error);
    }
  };

  const username = posts[0]?.owner?.username || "";

  return (
    <>
      <div className="amigo-post-list-page">
        <h1>{username ? `${username}` : "loading username..."}</h1>
        <div>
          <button onClick={handleAddAmigo} disabled={isAmigoAdded}>
            {isAmigoAdded ? "amigos" : "add amigo"}
          </button>
          <button onClick={handleDeleteAmigo} disabled={isAmigoDeleted}>
            {isAmigoDeleted ? "Amigo Deleted" : "Delete Amigo"}
          </button>
        </div>
        <div className="amigo-posts-container">
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <Link to={`/posts/${post._id}`}>
                  <img src={post.photo}></img>
                </Link>
                {post.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>no posts, yet.</p>
        )}
        </div>
      </div>
    </>
  );
}
