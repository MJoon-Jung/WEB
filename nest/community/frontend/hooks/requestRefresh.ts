import useSWR from "swr";
import fetcher from "../api/fetcherHeader";

const useRefresh = () => {
	const { data, error } = useSWR(`/auth/refresh`, fetcher);
	return {
		accessToken: data,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useRefresh;
