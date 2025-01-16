const BASE_URL = "/api";

// CREATE COMMENT FUNCTIONALITY 
export async function createComment(postId, commentFormData) {
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

// DELETE COMMENT FUNCTIONALITY
export async function deleteComment(postId, commentId) {
    try {
        const res = await fetch(
          `${BASE_URL}/posts/${postId}/comments/${commentId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        return res.json();
      } catch (error) {
        console.log(error);
      }
};

// UPDATE COMMENT FUNCTIONALITY
export async function updateComment(postId, commentId, commentFormData) {
    try {
      const res = await fetch(
        `${BASE_URL}/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentFormData),
        }
      );
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }