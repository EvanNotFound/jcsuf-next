
export default async function SignInAuth(credentials : {username: string, email: string, password: string}) {
    if (!credentials || !credentials.email || !credentials.password) {
        throw new Error('Missing credentials');
    }
    
    const { username, email, password } = credentials;
    
    const res = await fetch('https://api.jcsuf.top/api/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&mail=${encodeURIComponent(email)}`,
        credentials: 'include',
    });
    
    return res.json();
    }