import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as postService from '../../services/postService';  
import { set } from "mongoose";

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

    console.log('post:', post);

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
                {!post.comments.length && <p>no comments.</p>}
                {post.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                                {comment.owner.username}
                            </p>
                        </header>
                        <h3>{comment.text}</h3>
                        </article>
                ))}
            </div>
        </>
    )
};

export default PostDetailsPage;