import useSWR from "swr";

const fetcher = (url: string) =>
	fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
	}).then((res) => res.json());

export default function useLoginStatus() {
	const { data, error, isLoading, mutate, isValidating } = useSWR(
		"https://api.jcsuf.top/api/loginstatus",
		fetcher
	);
	console.log(data);

	return {
		user: data,
		error,
		isLoading,
		mutate,
		isValidating,
	};
}
