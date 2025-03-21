import { Link } from "react-router-dom"

export default function HomePage({ posts, user }) {
  return (
    <>
    {user ? (
      <main>
        {posts.map((post) => (
          <Link key={post._id} to={`/posts/${post._id}`}>
            <ul>
              <li>{post.title}</li>
            </ul>
          </Link>
        ))}
      </main>
    ) : (
      <h1>Welcome to Mi Closet Ti Closet</h1>
    )}
    </>
  )
};
