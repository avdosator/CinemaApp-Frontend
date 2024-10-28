import axios from "axios";

export default class ApiService {

    static axiosInstance = axios.create({
        baseURL: "http://localhost:8080/api/",
        headers: {
            "Content-Type": "application/json"
        }
    });

    static async get<T>(route: string, headers: Record<string, string> = {}):  Promise<T> {
        try {
            const response = await this.axiosInstance.get(route, headers);
            return response.data;
        } catch(err) {
            console.error("Bad request", err);
            throw err;
        }
    }
}