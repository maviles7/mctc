import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import * as postService from "../../services/postService";
import * as commentService from "../../services/commentService";

import CommentForm from "../../components/CommentForm/CommentForm";

const PostDetailsPage = ({ user, handleDeletePost }) => {
  const { postId } = useParams();
  console.log("postId:", postId);

  const [post, setPost] = useState(null);
  console.log("post:", post);

  console.log("user:", user);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      setPost(postData);
    };
    fetchPost();
  }, [postId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await commentService.createComment(
      postId,
      commentFormData
    );
    setPost({
      ...post,
      comments: [...post.comments, newComment],
    });
  };

  const handleDeleteComment = async (commentId) => {
    const deleteComment = await commentService.deleteComment(postId, commentId);
    setPost({
      ...post,
      comments: post.comments.filter((comment) => comment._id !== commentId),
    });
  };

  if (!post) return <main>oops. post not found.</main>;

  return (
    <>
      <div className="post-details-page">
        <div className="PDP-post-container">
          <div>
            <h1>
              {post.title} {post.avaibility && "✅"}
            </h1>
            <h4>{post.owner.username}</h4>
            <h2>{post.category}</h2>
            <h2>{post.size}</h2>
            <img src={post.photo} />
            <p>{post.moreInfo}</p>
            {post.owner._id === user._id && (
              <>
                <Link to={`/posts/${postId}/edit`}>edit.</Link>
                <button onClick={() => handleDeletePost(postId)}>
                  delete.
                </button>
              </>
            )}
          </div>
        </div>
        <div className="PDP-comments-container">
          <h3>comments</h3>
          <CommentForm handleAddComment={handleAddComment} />
          {!post.comments.length && <p>no comments.</p>}
          {post.comments.map((comment) => (
            <article key={comment._id}>
              <header>
                <p>{comment.owner.username}</p>
              </header>
              <h3>{comment.text}</h3>
              {comment.owner === user._id && (
                <div>
                  <Link to={`/posts/${postId}/comments/${comment._id}/edit`}>
                    edit comment.
                  </Link>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    delete.
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetailsPage;
