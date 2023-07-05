import useSWR from "swr";

const fetcher = (url: string) => fetch(url, {method: "GET",credentials: "include",}).then(res => res.json())

export default function getNewPostsData() {
	const { data, error,isLoading } = useSWR('https://api.jcsuf.top/api/fetchnewarticle', fetcher);

	return {
		posts: data,
		error,
		isLoading
	}
}

