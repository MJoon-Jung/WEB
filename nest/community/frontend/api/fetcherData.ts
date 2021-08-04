import { client } from './client';

const fetcher = (url: string) => client(url).then((res) => res.data);

export default fetcher;
