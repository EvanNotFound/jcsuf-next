import useSWR from "swr";

const fetcher = (url: string) => fetch(url, {method: "GET",credentials: "include",}).then(res => res.json())

export default function useLoginStatus() {
	const { data, error,isLoading } = useSWR('https://api.jcsuf.top/api/loginstatus', fetcher);

	return {
		user: data,
		error,
		isLoading
	}
}