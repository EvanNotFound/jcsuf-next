
export async function getLoginStatus() {
	console.log("Fetching login status...");
	const res = await fetch("https://api.jcsuf.top/api/loginstatus");
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}