const BASE_URL = "/api";

// CREATE COMMENT FUNCTIONALITY 
export async function create(postId, commentFormData) {
    try {
        const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
