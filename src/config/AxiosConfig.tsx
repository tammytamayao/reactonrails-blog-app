import axios from "axios";

const baseURL = process.env.REACT_APP_API_ACTIVE+`api/v1/`;
const client = axios.create({
    baseURL: baseURL
});

export { baseURL, client } 