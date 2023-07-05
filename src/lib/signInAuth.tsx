
export default async function SignInAuth(credentials : {email: string, password: string}) {
if (!credentials || !credentials.email || !credentials.password) {
    throw new Error('Missing credentials');
}

const { email, password } = credentials;

const res = await fetch('https://api.jcsuf.top/api/signin', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `password=${encodeURIComponent(password)}&mail=${encodeURIComponent(email)}`,
    credentials: 'include',
});

return res.json();
}

