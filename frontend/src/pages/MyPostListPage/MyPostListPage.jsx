import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import * as amigoService from "../../services/amigoService";
import * as closetService from "../../services/closetService";

export default function MyPostListPage({ posts, user }) {
  console.log("user:", user);

  const navigate = useNavigate();

  const [amigosInfo, setAmigosInfo] = useState("");
  const [closetItems, setClosetItems] = useState([]);

  useEffect(() => {
    const fetchAmigosInfo = async () => {
      const fetchedAmigos = await amigoService.getAmigo();
      setAmigosInfo(fetchedAmigos);
    };

    const fetchClosetItems = async () => {
      const fetchedClosetItems = await closetService.index();
      setClosetItems(fetchedClosetItems); // Set closet items in state
    };

    fetchAmigosInfo();
    fetchClosetItems();
  }, []);

  console.log("amigos:", amigosInfo);

  const handleDeleteAmigo = async (amigoId) => {
    const updatedAmigos = await amigoService.deleteAmigo(amigoId);
    setAmigosInfo({ amigos: updatedAmigos });
    navigate("/posts");
  };

  const handleRemoveFromCloset = async (postId) => {
    try {
      const updatedClosetItems = await closetService.deleteItem(postId); // Call the service function
      setClosetItems(updatedClosetItems); // Update the state with the updated closet items
    } catch (error) {
      console.error("Error removing item from closet:", error);
    }
  };

  return (
    <>
      <div className="MPLP-container">
        <div className="MPLP-myposts-container">
          <h1>my closet</h1>
          <h4>things in my current posession.</h4>
          <ul>
            {posts
              .filter((post) => post.owner._id === user._id)
              .map((post) => (
                <li key={post._id} className="MPLP-myposts-post">
                  <Link to={`/posts/${post._id}`}>
                    <img src={post.photo}></img>
                  </Link>
                  <h3>{post.title}</h3>
                </li>
              ))}
          </ul>
        </div>
        <div className="MPLP-mycloset-container">
          <h1>our closet.</h1>
          <h4>things i want to borrow one day.</h4>
          {closetItems.length > 0 ? (
            <ul>
              {closetItems.map((item) => (
                <li key={item._id} className="MPLP-mycloset-post">
                  <Link to={`/posts/${item._id}`}>
                    <img src={item.photo}></img>
                  </Link>
                  {item.title}
                  <button onClick={() => handleRemoveFromCloset(item._id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in closet.</p>
          )}
        </div>
        <div className="MPLP-myamigos-container">
          <h1>my amigos</h1>
          <h4>the people i want to share things with.</h4>
          {amigosInfo.amigos && amigosInfo.amigos.length > 0 ? (
            <ul>
              {amigosInfo.amigos.map((amigo) => (
                <li key={amigo._id} className="MPLP-myamigo">
                  {amigo.username}
                  <button onClick={() => handleDeleteAmigo(amigo._id)}>
                    delete.
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No amigos found.</p>
          )}
        </div>
      </div>
    </>
  );
}
