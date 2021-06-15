import http from "./httpMemoryCommon"

const apiMemoryClient = {
    async save(data) {
        // http://127.0.0.1:8081/firmae/v1/profiles
        const response = await http.post("profiles", data);
        return response;
    },
    async validNickName(nickname) {
        // http://127.0.0.1:8081/firmae/v1/profiles/N1-0908/exist
        const response = await http.get(`profiles/${nickname}/exist`);
        return response;
    },

    async getProfilesByNickName(nickname) {
        // http://127.0.0.1:8081/firmae/v1/profiles/N1-0907
        const response = await http.get(`profiles/${nickname}`);
        return response;
    },
}

export default apiMemoryClient;
