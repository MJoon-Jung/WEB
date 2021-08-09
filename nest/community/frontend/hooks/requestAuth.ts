import useSWR from "swr";
import fetcher from "../api/fetcherData";

const useAuth = () => {
	const { data, error } = useSWR(`/auth`, fetcher);
	return {
		auth: data,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useAuth;
