import ArticleColumn from "@/components/ArticleColumn";
import { getNewArticlesData } from "@/lib/newArticles";
import { getLoginStatus } from "@/lib/loginStatus";

export default async function NewArticlesSection() {
	const newArticlesData = await getNewArticlesData();
	const loginStatus = await getLoginStatus();

    var canDelete: boolean = false;
    canDelete = loginStatus.admin_level > 0;

    var uid = loginStatus.uid;

	return (
		<section className="w-full bg-gh-bg p-1 dark:bg-gh-darkbg md:w-9/12 md:p-5">
			<div className="mx-2 mb-2 border-b-2 border-solid border-gh-gray-1 p-3 dark:border-gh-gray-8 md:mx-6">
				<h1 className="text-xl font-bold">置顶内容</h1>
			</div>

			<div className="mx-2 flex flex-row justify-between md:mx-6">
				<div className="post-column w-7/12 dark:border-gh-gray-7 dark:bg-gh-subtledarkbg">
					<h4 className="mb-1 text-center text-lg font-bold">
						<a href="bugreport.html"> 漏洞上报页 </a>
					</h4>
					<p className="text-center text-sm">
						如果您在使用JCSUF论坛的过程中遇到了任何问题（如出现漏洞、无法进行登录等操作，或是对论坛运作机制有疑问），都可以在这里反馈
					</p>
				</div>
				<div className="m-2.5 hidden w-2/12 max-w-[135px] flex-col justify-center rounded-xl border border-solid border-gh-border bg-white px-2 py-3 dark:border-gh-gray-7 dark:bg-gh-subtledarkbg md:flex">
					<div className="flex flex-wrap justify-center gap-1.5">
						<div className="article-info-stats-item">
							<i className="fa-solid fa-up"></i>
							<p className="ml-1 text-sm text-gh-gray-8 dark:text-gh-gray-2">
								0
							</p>
						</div>

						<div className="article-info-stats-item">
							<i className="fa-solid fa-message-lines text-sm"></i>
							<p className="ml-1 text-sm text-gh-gray-8 dark:text-gh-gray-2">
								0
							</p>
						</div>
						<div className="article-info-stats-item">
							<i className="fa-solid fa-down"></i>
							<p className="ml-1 text-sm text-gh-gray-8 dark:text-gh-gray-2">
								0
							</p>
						</div>
						<div className="article-info-stats-item">
							<i className="fa-solid fa-fire"></i>
							<p className="ml-1 text-sm text-gh-gray-8 dark:text-gh-gray-2">
								0
							</p>
						</div>
					</div>
				</div>
				<div className="post-column w-5/12 gap-1 dark:border-gh-gray-7 dark:bg-gh-subtledarkbg md:w-3/12">
					<div>
						<i className="fa-regular fa-paper-plane"></i>
						<a
							href="user.html?uid=806604291"
							className="ml-1 text-sm font-bold"
						>
							Admin
						</a>
					</div>
					<div>
						<i className="fa-regular fa-calendar-days"></i>
						<p className="ml-1 hidden md:inline">2022-07-10</p>
						<p className="ml-1 inline md:hidden">07/10</p>
					</div>
					<div className="text-sm md:hidden md:text-base">
						<i className="fa-regular fa-comments"></i>
						<p className="ml-1 inline">0</p>
					</div>
					<div className="text-sm md:hidden md:text-base">
						<i className="fa-regular fa-eye"></i>
						<p className="ml-1 inline">0</p>
					</div>
				</div>
			</div>
        

			<div className="mx-2 mb-2 flex items-center justify-between border-b-2 border-solid border-gh-gray-1 p-3 dark:border-gh-gray-8 md:mx-6">
				<h1 className="text-xl font-bold">最新帖子</h1>
				<div className="text-sm text-gh-gray-8 dark:text-gh-gray-2">
					显示
                    <input
                    type="number"
                    defaultValue="10"
                    id="input-row-count"
                    min="5"
                    max="200"
                    className="gh-border mr-1 w-10 rounded-lg bg-transparent px-2 dark:border-gh-gray-7"
                    />
					篇文章
					<button
						// onClick="reloadnew()"
						className="ml-1 inline rounded-lg border border-solid border-gh-green-5 bg-gh-green-5 px-2 py-1 text-sm text-white hover:bg-gh-green-6"
					>
						重新加载
					</button>
				</div>
			</div>
			<div id="articles">
				{newArticlesData.articles.map(
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
                        <ArticleColumn id={id} title={title} author={author} snapshot={snapshot} like={like} dislike={dislike} ccount={ccount} view={view} ctime={ctime} author_name={author_name} uid={uid} canDelete={canDelete} url={"/post/" + id} />
					)
				)}
			</div>
		</section>
	);
}
