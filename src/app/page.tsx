
import NoticeSection from "@/components/NoticeSection";
import NewArticlesSection from "@/components/NewArticlesSection";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";



export default async function Home() {

	return (
		<div>
			<Header />
			<div
				className="fixed left-0 top-20 z-45 hidden h-screen w-screen backdrop-brightness-75"
				id="search-bg"
			>
				<div
					className="fixed left-1/2 top-20 z-50 w-3/5 -translate-x-1/2 rounded-2xl border-[1.5px] border-solid bg-gh-bg p-10 dark:border-gh-darkborder dark:bg-gh-subtledarkbg"
					id="search-results"
				>
					<div className="mb-2 text-xl font-bold">
						<h1>搜索结果</h1>
					</div>
					<div id="searched-articles">还没有搜索哦~写点什么吧~</div>
				</div>
			</div>

			<main className="mt-20 flex flex-row justify-center">
				<NoticeSection />
				<NewArticlesSection />
			</main>

			<Footer />
		</div>
	);
}
