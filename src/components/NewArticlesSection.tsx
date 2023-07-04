import ArticleColumn from "@/components/ArticleColumn";
import { getNewArticlesData } from "@/lib/getNewArticles";
import { getLoginStatus } from "@/lib/getLoginStatus";
import { SyncIcon } from "@primer/octicons-react"

export default async function NewArticlesSection() {
	const newArticlesData:Promise<any> = getNewArticlesData();

	const loginStatusData:Promise<any> = getLoginStatus();

	const [newArticles, loginStatus] = await Promise.all([newArticlesData, loginStatusData]);

    var canDelete: boolean = false;
    canDelete = loginStatus.admin_level > 0;

    var uid = loginStatus.uid;

	return (
		<section className="w-full bg-gh-bg p-1 dark:bg-gh-darkbg md:w-9/12 md:p-5">
			<div className="mx-2 mb-2 border-b-2 border-solid border-gh-gray-1 p-3 dark:border-gh-gray-8 md:mx-6">
				<h1 className="text-xl font-bold">置顶内容</h1>
			</div>

			<ArticleColumn id={0} title="漏洞上报页" author={-2} snapshot="如果您在使用JCSUF论坛的过程中遇到了任何问题（如出现漏洞、无法进行登录等操作，或是对论坛运作机制有疑问），都可以在这里反馈" like={0} dislike={0} ccount={0} view={666} ctime={1688985028000} author_name="Admin" uid={-1} canDelete={false} url={"/bugreport"} />
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
						<SyncIcon size={16} />
					</button>
				</div>
			</div>
			<div id="articles">
				{newArticles.articles.map(
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
                        <ArticleColumn id={id} title={title} author={author} snapshot={snapshot} like={like} dislike={dislike} ccount={ccount} view={view} ctime={ctime} author_name={author_name} uid={uid} canDelete={canDelete} url={"/post/" + id} key={id}/>

					)
				)}
			</div>
		</section>
	);
}
