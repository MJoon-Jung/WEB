import axios, { AxiosRequestConfig } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import requestRefresh from "./requestRefresh";

interface JWTPayload extends JwtPayload {
	exp: number;
}

const client = axios.create({
	baseURL: "http://localhost:3065/api",
	withCredentials: true,
});

const setAccessToken = async (config: AxiosRequestConfig) => {
	const accessToken = await requestRefresh();
	config.headers.authorization = accessToken;
	return config;
};

client.interceptors.request.use(
	async (config) => {
		if (!config.headers.common?.Authorization) {
			return await setAccessToken(config);
		}
		const accessToken = config.headers.common.Authorization.split(" ")[1];
		const { exp } = jwtDecode<JWTPayload>(accessToken);
		if (exp * 1000 - Date.now() <= 60000) {
			return await setAccessToken(config);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

client.interceptors.response.use(
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

const clientSetHeader = (accessToken: string) => {
	client.defaults.headers.common["Authorization"] = accessToken;
};

export { client, clientSetHeader };
