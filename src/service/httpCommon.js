import axios from "axios";

export default axios.create({
    baseURL: 'https://randomuser.me/api/',
    // timeout: 1000,
    headers: {
        "Content-type": "application/json"
    }
});
