import useSWR from "swr";

const fetcher = (url: string) => fetch(url, {method: "GET",credentials: "include",}).then(res => res.json())

export default function useNewPostsData() {
	const { data, error,isLoading, mutate, isValidating } = useSWR('https://api.jcsuf.top/api/fetchnewarticle', fetcher);

	return {
		posts: data,
		error,
		isLoading,
		mutate,
		isValidating
	}
}

