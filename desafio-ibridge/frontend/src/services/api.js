import axios from "axios";

const api = axios({
    method: 'get',
    url: "http://127.0.0.1:8000/",
    withCredentials: false,
});



export default api;