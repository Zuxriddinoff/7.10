import axios from "axios";

export const api = axios.create({
    baseURL: "https://710-backend-production.up.railway.app/"
})
