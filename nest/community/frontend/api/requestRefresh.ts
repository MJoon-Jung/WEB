import { refreshClient } from "./refreshClient";

const accessToken = () =>
	refreshClient
		.get("/auth/refresh")
		.then((res) => res.headers.authorization)
		.catch((err) => console.error(err));

export default accessToken;
