export default async function updateGender(genderId: number) {
	const res = await fetch("https://api.jcsuf.top/api/updateprofile", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `gender=${encodeURIComponent(genderId)}`,
		credentials: "include",
	});

	return res.json();
}
