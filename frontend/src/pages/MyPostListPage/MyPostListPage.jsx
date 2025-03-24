import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import * as amigoService from "../../services/amigoService";

export default function MyPostListPage({ posts, user }) {
  console.log('user:', user);

  const navigate = useNavigate();

  const [amigosInfo, setAmigosInfo] = useState("");

  useEffect(() => {
    const fetchAmigosInfo = async () => {
      const fetchedAmigos = await amigoService.getAmigo();
      setAmigosInfo(fetchedAmigos);
    };
    fetchAmigosInfo();
  }, []);

  console.log('amigos:', amigosInfo);

  const handleDeleteAmigo = async (amigoId) => {
    const updatedAmigos = await amigoService.deleteAmigo(amigoId);
    setAmigosInfo({ amigos: updatedAmigos});
    navigate('/posts');

  };

  return (
    <>
      <div>
        <h1>my posts</h1>
        {posts
          .filter((post) => post.owner._id === user._id)
          .map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <ul>
                <li>{post.title}</li>
              </ul>
            </Link>
          ))}
      </div>
      <div>
        <h1>my amigos</h1>
        {amigosInfo.amigos && amigosInfo.amigos.length > 0 ? (
          <ul>
            {amigosInfo.amigos.map((amigo) => (
              <li key={amigo._id}>{amigo.username}
              <button onClick={() => handleDeleteAmigo(amigo._id)}>delete.</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No amigos found.</p>
        )}
      </div>
      <div>
        <h1>my closet</h1>
      </div>
    </>
  );
}
