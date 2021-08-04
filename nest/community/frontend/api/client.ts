import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";

const client = axios.create({
	baseURL: "http://localhost:3065",
	withCredentials: true,
});

client.interceptors.request.use(function (config) {
	if (config.headers.common?.Authorization) {
		const accessToken = config.headers.common.Authorization;
		const { iat, exp } = jwtDecode<JwtPayload>(accessToken);
		console.log(`iat: ${iat}  exp: ${exp}`);
	}
	return config;
});

client.interceptors.response.use(function (response) {
	if (response.headers?.authorization) {
		client.defaults.headers.common.Authorization =
			response.headers.authorization;
	}
	return response;
});

const clientSetHeader = (accessToken: string) => {
	client.defaults.headers.common["Authorization"] = accessToken;
};

export { client, clientSetHeader };
