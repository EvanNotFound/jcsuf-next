'use client'
import ArticleColumnLoading from "@/components/templates/ArticleColumnLoading";
import ArticleColumn from "@/components/templates/ArticleColumn";
import getNewPostsData from "@/lib/getNewPosts";


export default function NewArticlesSection() {
	const {posts, error, isLoading} = getNewPostsData();

	if (isLoading) return (
		<div id="posts">
			<ArticleColumnLoading />
			<ArticleColumnLoading />
			<ArticleColumnLoading />
			<ArticleColumnLoading />
			<ArticleColumnLoading />
			<ArticleColumnLoading />
			<ArticleColumnLoading />
			<ArticleColumnLoading />
			<ArticleColumnLoading />
			<ArticleColumnLoading />
		</div>
	)
	if (error) return <div id="posts">Failed to load</div>

	return (
			<div id="posts">
				{posts.articles.map(
					({
						id,
						title,
						author,
						snapshot,
						like,
						dislike,
						ccount,
						view,
						ctime,
						author_name,
                        uid
					}: {
						id: number;
						title: string;
						author: number;
						snapshot: string;
						like: number;
						dislike: number;
						ccount: number;
						view: number;
						ctime: number;
						author_name: string;
                        uid: number;
					}) => (
                        <ArticleColumn id={id} title={title} author={author} snapshot={snapshot} like={like} dislike={dislike} ccount={ccount} view={view} ctime={ctime} author_name={author_name} uid={uid} url={"/post/" + id} key={id}/>

					)
				)}
			</div>
	);
}
