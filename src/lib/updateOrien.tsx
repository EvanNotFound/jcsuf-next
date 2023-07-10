export default async function updateOrien(orienId: number) {
	const res = await fetch("https://api.jcsuf.top/api/updateprofile", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `orientation=${encodeURIComponent(orienId)}`,
		credentials: "include",
	});

	return res.json();
}
