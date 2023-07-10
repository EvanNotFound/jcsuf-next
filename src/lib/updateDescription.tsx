export default async function updateDescription(description: string) {
	const res = await fetch("https://api.jcsuf.top/api/updateprofile", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: `desc=${encodeURIComponent(description)}`,
		credentials: "include",
	});

	return res.json();
}
