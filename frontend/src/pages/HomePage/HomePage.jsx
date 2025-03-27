import { Link } from "react-router-dom";
import { useState } from "react";
import * as closetService from "../../services/closetService";
import mctcLogo from "../../assets/mctc_logo.png"; // Import the logo image

export default function HomePage({ posts, user }) {
  const [addedToCloset, setAddedToCloset] = useState([]);

  const handleAddToCloset = async (postId) => {
    try {
      await closetService.addItem(postId); // Call the service function
      setAddedToCloset((prev) => [...prev, postId]); // Update state to track added posts
    } catch (error) {
      console.error("Error adding post to closet:", error);
    }
  };

  return (
    <>
      {user ? (
        <div className="homepage-container">
          <img id="home-logo" src={mctcLogo} alt="mctc logo" />
          <div className="homepage-content-container">
            <ul>
              {posts.map((post) => (
                <li key={post._id} className="homepage-post">
                  <Link to={`/posts/${post._id}`}>
                    <img src={post.photo}></img>
                  </Link>
                  <h3>{post.title}</h3>
                  <p>{post.owner.username}</p>
                  <button
                    onClick={() => handleAddToCloset(post._id)} // Add post to closet
                    disabled={addedToCloset.includes(post._id)} // Disable button if already added
                  >
                    {addedToCloset.includes(post._id)
                      ? "Added to Closet"
                      : "Add to Closet"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <h1>Welcome to Mi Closet Ti Closet</h1>
      )}
    </>
  );
}
