import http from "./httpCommon"

const apiClient = {
    async getAll() {
        const response = await http.get("?results=100&nationality=ES&exc=login,id");
        return response;
    },
}

export default apiClient;
