import { client } from "./defaultClient";

const fetcher = (url: string) =>
	client(url).then((res) => {
		return res;
	});

export default fetcher;
