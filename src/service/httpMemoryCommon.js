import axios from "axios";

export default axios.create({
    baseURL: 'http://127.0.0.1:8081/firmae/v1/',
    // timeout: 1000,
    headers: {
        "Content-type": "application/json"
    }
})

