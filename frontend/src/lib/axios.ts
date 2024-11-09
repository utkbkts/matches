import _axios from "axios";

const axiosInstance = _axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
  withCredentials: true,
});

export { axiosInstance as axios };
