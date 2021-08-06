import axios from "axios";

const client = axios.create();

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = token;
  } else {
    console.log(`Token doesn't exist`);
  }
  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response.status === 403) {
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  }
);

export default client;
