import sendRequest from "./sendRequest";

const BASE_URL = "/api/posts";  

// INDEX FUNCTIONALITY 
export function index() {
    return sendRequest(BASE_URL);
};