import { getPostDetails, getPostIdList } from "@/lib/posts";
import { formatDateTime } from "@/components/ArticleColumn";
import Header from "@/components/header/Header";

export async function getStaticPaths() {
	const paths = await getPostIdList();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: any }) {
	const postData = await getPostDetails(params.id);
	return {
		props: {
			postData,
		},
	};
}

export default function Post({
	postData,
	loginStatus,
}: {
	postData: any;
	loginStatus: any;
}) {
	return (
		<div>
			<Header />
			<div className="bg-gray-800 h-screen p-16 text-gray-100">
				<div className="text-center font-bold text-3xl">
					{postData.title}
				</div>
				<div className="text-justify my-8 text-gray-200">
					{postData.description}
				</div>
				<div className="text-gray-400">
					Published On: {formatDateTime(postData.ctime)}
				</div>
			</div>
		</div>
	);
}
