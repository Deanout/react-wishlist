import axios from "axios";

let instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

instance.defaults.xsrfHeaderName = "X-CSRF-Token";

instance.defaults.withCredentials = true;

export default instance;