import axios from "axios";
import { useQuery } from "react-query";

export const useThreads = (args = {}) => {
	//Simple request, hence no need to pass any queryParams
	const { specialKey = null, queryConfig = {} } = args;

	return useQuery(
		["threads", specialKey],
		async () => {
			const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/threads`);
			return data;
		},
		{
			...queryConfig,
			cacheTime: Infinity,
			staleTime: Infinity,
		}
	);
};
