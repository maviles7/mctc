import { Link } from "react-router-dom"

export default function HomePage({ posts,user }) {
  return (
    <>
    {user ? (
      <main>
        {posts.map((post) => (
          <p key={post._id}>{post.title}</p>
        ))}
      </main>
    ) : (
      <h1>Welcome to Mi Closet Ti Closet</h1>
    )}
    </>
  )
};
