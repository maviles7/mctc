import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as postService from '../../services/postService';  
import * as commentService from '../../services/commentService';

import CommentForm from "../../components/CommentForm/CommentForm";

const PostDetailsPage = ({ user, handleDeletePost }) => {
    const { postId } = useParams();
    
    // console.log('postId:', postId);

    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId);
            setPost(postData);
        };
        fetchPost();
    }, [postId]);

    const handleAddComment = async (commentFormData) => {
        const newComment = await commentService.create(postId, commentFormData);
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

    if (!post) return <main>oops. post not found.</main>

    return (
        <>
            <div>
                <h1>{post.title}</h1>
                <h3>{post.owner.username}</h3>
            </div>
            {post.owner._id === user. _id && (
                <>
                <Link to={`/posts/${postId}/edit`}>edit.</Link>
                <button onClick={() => handleDeletePost(postId)}>delete.</button>
                </>
            )}
            <div>
                <h3>comments</h3>
                <CommentForm handleAddComment={handleAddComment} />
                {!post.comments.length && <p>no comments.</p>}
                {post.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                                {comment.owner.username}
                            </p>
                        </header>
                        <h3>{comment.text}</h3>
                        {comment.owner._id === user._id && (
                            <div>
                                <button onClick={() => handleDeleteComment(comment._id)}>delete.</button>
                            </div>
                        )}
                        </article>
                ))}
            </div>
        </>
    )
};

export default PostDetailsPage;