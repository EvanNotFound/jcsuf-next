export default async function deletePost({postId} : {postId: number}) {
    const res = await fetch('https://api.jcsuf.top/api/deletearticle?aid='+postId, {
        method: 'GET',
        credentials: 'include',
    });

	return res.json();
}