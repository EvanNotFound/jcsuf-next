export default async function getUserInfo(userId : string) {
    const res = await fetch(`https://api.jcsuf.top/api/userinfo?uid=${userId}`)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const userInfo = await res.json()

  return userInfo
}
