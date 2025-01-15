import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as postService from '../../services/postService';
import * as commentService from '../../services/commentService';;

const CommentForm = ({ handleAddComment }) => {
    const [commentFormData, setCommentFormData] = useState({ text: '' });
    const { postId, commentId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
          const postData = await postService.show(postId);
          setCommentFormData(
            postData.comments.find((comment) => comment._id === commentId)
          );
        };
        if (postId && commentId) fetchPost();
      }, [postId, commentId]);

    const handleChange = (event) => {
        setCommentFormData({
            ...CommentForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddComment(commentFormData);
        setCommentFormData({ text: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">comment:</label>
            <textarea
                required
                type="text"
                name="text"
                value={commentFormData.text}
                onChange={handleChange}
            />
            <button type="submit">add comment.</button>
        </form>
    )

};

export default CommentForm;