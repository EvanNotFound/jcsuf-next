export async function getPostIdList() {
	const res = await fetch("https://api.jcsuf.top/api/fetchnewarticle");
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	const wholeList = await res.json();
	const idList = wholeList.articles.map((article: { id: string }) => ({
		params: {
			id: String(article.id),
		},
	}));

	console.log(idList);
	return idList;
    
}

export async function getPostDetails(postId: number) {
    const res = await fetch(`https://api.jcsuf.top/api/articleinfo?aid=${postId}`)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const postData = await res.json()
	
    return postData
  }