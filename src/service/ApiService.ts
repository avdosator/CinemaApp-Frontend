import axios, { AxiosResponse } from "axios";

export default class ApiService {

    static axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
        headers: {
            "Content-Type": "application/json"
        }
    });

    static async get<T>(route: string, params: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(route, { params, headers });
            return response.data;
        } catch (err) {
            console.error("GET request failed", err);
            throw err;
        }
    }

    static async post<T>(route: string, body: Object, headers: Record<string, string> = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(route, body, { headers });
            return response.data;
        } catch (err) {
            //console.error("POST request failed", err);
            throw err;
        }
    }

    static async patch<T>(route: string, body: Object, headers: Record<string, string> = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.patch(route, body, { headers });
            return response.data;
        } catch (err) {
            console.error("PATCH request failed", err);
            throw err;
        }
    }

    static async delete<T>(route: string, headers: Record<string, string> = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.delete(route, { headers });
            return response.data;
        } catch (err) {
            console.error("DELETE request failed", err);
            throw err;

        }
    }
}
