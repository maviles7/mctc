import sendRequest from "./sendRequest";

const BASE_URL = "/api/posts";  

// INDEX FUNCTIONALITY
export function index() {
    return sendRequest(BASE_URL);
};

// SHOW FUNCTIONLITY 
export function show(postId) {
    return sendRequest(`${BASE_URL}/${postId}`);
};

// CREATE FUNCTIONALITY
export async function create(postFormData) {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// DELETE FUNTIONALITY
export async function deletePost(postId) {
    try {
        const res = await fetch(`${BASE_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

//UPDATE FUNCTIONALITY
export async function update(postId, postFormData) {
    try {
        const res = await fetch(`${BASE_URL}/${postId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// GET ALL POSTS BY A USER
export async function getAmigoPosts(userId) {
    try {
        const res = await fetch(`${BASE_URL}/amigos/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};