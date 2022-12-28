import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

/* =============GET POSTS============== */
export const getPosts = async () => {
    const response = await axios.get(`posts`)
    return response.data;
}

/* =============GET COMMENTS============== */
export const getComments = async (id) => {
    const response = await axios.get(`posts/${id}/comments`)
    return response.data;
}
// 