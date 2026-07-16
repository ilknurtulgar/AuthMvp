import axios from "axios";
import { config } from "process";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export default api;

