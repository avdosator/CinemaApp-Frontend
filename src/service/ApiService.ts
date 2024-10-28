import axios from "axios";

export default class ApiService {

    static axiosInstance = axios.create({
        baseURL: "http://localhost:8080/api/",
        headers: {
            "Content-Type": "application/json"
        }
    });
}