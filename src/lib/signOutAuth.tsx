
export default async function SignOutAuth() {
const res = await fetch('https://api.jcsuf.top/api/signout', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		},
		credentials: 'include',
	});
	
	return res.json();
	}
	
	
