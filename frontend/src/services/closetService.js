const BASE_URL = "/api";

export async function index() {
    const res = await fetch(`${BASE_URL}/closet/items`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.json();
}

export async function addItem(postId) {
    const res = await fetch(`${BASE_URL}/closet/add-item/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ postId }),
    });
    return res.json();
}

export async function deleteItem(postId) {
    const res = await fetch(`${BASE_URL}/closet/remove-item/${postId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.json(); 
} 