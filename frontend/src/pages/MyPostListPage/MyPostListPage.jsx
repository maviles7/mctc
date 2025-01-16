import { Link } from "react-router-dom";

export default function MyPostListPage({ posts, user }) {
  return (
    <>
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
    </>
  );
}
