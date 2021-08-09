import { client } from "./defaultClient";

const fetcher = (url: string) =>
	client(url).then((res) => res.headers.authorization);

export default fetcher;
