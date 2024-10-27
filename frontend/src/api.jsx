import axios from "axios";


/**
 * Creates an Axios instance with a base URL for the application's API.
 * The base URL is determined by the `VITE_API_URL` environment variable, if it exists,
 * otherwise it defaults to the `apiUrl` constant.
 *
 * @returns {AxiosInstance} - An Axios instance configured with the appropriate base URL.
 */
const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


export default api;