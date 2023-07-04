
export default async function getPostDetails(postId: string) {
    const res = await fetch(`https://api.jcsuf.top/api/articleinfo?aid=${postId}`)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const postData = await res.json()
	
    return postData
  }