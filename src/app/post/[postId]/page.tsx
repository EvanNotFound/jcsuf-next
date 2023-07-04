import getPostDetails from "@/lib/getPostDetails";
import { formatDateTime } from "@/components/ArticleColumn";
import Header from "@/components/header/Header";
import { Suspense } from "react";
import PostComments from "@/components/post/PostComments";
import PostVote from "@/components/post/PostVote";
import getUserInfo from "@/lib/getUserInfo";


type Params = {
	params: {
		postId: string;
	};
};

export default async function Post({ params: { postId } }: Params) {
	const postData: Promise<any> = getPostDetails(postId);

	const post = await postData;

	const userInfoData: Promise<any> = getUserInfo(post.author);

	const userInfo = await userInfoData;
	return (
		<div>
			<Header />
			<main className="mt-20 bg-white dark:bg-gh-darkbg flex flex-row gap-5 ">
				<Suspense
					fallback={
						<div className="text-xl text-center font-bold">
							Loading...
						</div>
					}
				>
					<section className="p-8 sm:w-9/12 w-full">
						<div className="font-bold text-3xl border-b-2 border-solid border-gh-gray-1 p-3 dark:border-gh-gray-8 mb-5">
							{post.title}
						</div>
						<div className="pl-3 gh-border dark:border-gh-darkborder  dark:bg-gh-subtledarkbg rounded-xl flex flex-row mb-6">
							<PostVote like={post.like} dislike={post.dislike} avatar={userInfo.avatar}/>
							<div className="flex flex-col w-full">
								<div className="h-8 bg-gh-bg w-full rounded-tr-xl border-b flex flex-row pl-4 items-center">
									<p className="text-sm font-bold">{userInfo.name}</p>
									<p className="text-sm text-gh-gray-7 dark:text-gh-gray-2 ml-2">
										{formatDateTime(post.ctime)}
									</p>
								</div>
								<div className="p-5 w-10/12">{post.html}</div>
							</div>
							
						</div>
						<PostComments comments={post.comments} />
					</section>
					<section
						id="post-info"
						className="hidden sm:flex w-3/12 h-screen p-8 border-l-[1.5px] border-solid border-gh-gray-2 dark:border-gh-gray-8 flex-col justify-between"
					>
						<div className="">
							Published On: {formatDateTime(post.ctime)}
						</div>
					</section>
				</Suspense>
			</main>
		</div>
	);
}
