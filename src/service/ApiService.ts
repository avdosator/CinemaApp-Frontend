import axios from "axios";

export default class ApiService {

    static axiosInstance = axios.create({
        baseURL: "http://localhost:8080/api/",
        headers: {
            "Content-Type": "application/json"
        }
    });

    static async get<T>(route: string, headers: Record<string, string> = {}): Promise<T> {
        try {
            const response = await this.axiosInstance.get(route, { headers });
            return response.data;
        } catch (err) {
            console.error("GET request failed", err);
            throw err;
        }
    }

    static async post<T>(route: string, body: Object, headers: Record<string, string> = {}): Promise<T> {
        try {
            const response = await this.axiosInstance.post(route, body, { headers });
            return response.data;
        } catch(err) {
            console.error("POST request failed", err);
            throw err;
        }
    }
}