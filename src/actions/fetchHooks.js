import axios from "axios";
import { useQuery } from "react-query";

//Simple request, hence no need to pass any arguments
export const useThreads = () => {
	return useQuery(
		["threads"],
		async () => {
			const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/threads`);
			return data;
		},
		{
			cacheTime: Infinity,
			staleTime: Infinity,
		}
	);
};
