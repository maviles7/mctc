import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as amigoService from "../../services/amigoService";
import { set } from "mongoose";
import { use } from "react";

export default function MyPostListPage({ posts, user }) {
  console.log('user:', user);

  const [amigosInfo, setAmigosInfo] = useState("");

  useEffect(() => {
    const fetchAmigosInfo = async () => {
      const fetchedAmigos = await amigoService.getAmigo();
      setAmigosInfo(fetchedAmigos);
    };
    fetchAmigosInfo();
  }, []);

  console.log('amigos:', amigosInfo);

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
        <h1>My Amigos.</h1>
        {amigosInfo.amigos && amigosInfo.amigos.length > 0 ? (
          <ul>
            {amigosInfo.amigos.map((amigo) => (
              <li key={amigo._id}>{amigo.username}</li>
            ))}
          </ul>
        ) : (
          <p>No amigos found.</p>
        )}
      </div>
    </>
  );
}
