import axios from "axios";
import { client } from "./defaultClient";

const refreshClient = axios.create({
	baseURL: "http://localhost:3065/api",
	withCredentials: true,
});

refreshClient.interceptors.response.use(
	(response) => {
		if (response.headers?.authorization) {
			client.defaults.headers.common.Authorization =
				response.headers.authorization;
		}
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export { refreshClient };
