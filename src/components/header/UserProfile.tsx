"use client";
import getLoginStatus from "@/lib/getLoginStatus";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UserProfile() {
	// const [data, setData] = useState<UserData | null>(null);
	// const [isLoading, setLoading] = useState(true);

	// useEffect(() => {
	//   setLoading(true);
	//   fetch('https://api.jcsuf.top/api/loginstatus', {
	//     method: 'GET',
	//     credentials: 'include',
	//     })
	//     .then((res) => res.json())
	//     .then((data) => {
	//       setData(data);
	//       setLoading(false);
	//     })
	//     .catch((error) => {
	//       console.error('Failed to fetch data:', error);
	//       setLoading(false);
	//     });
	// }, []);

	const { user, error, isLoading } = getLoginStatus();
  console.log(user);

	if (isLoading) {
		return (
			<div className="mr-2 flex items-center md:mr-4">
				<div className="hidden flex-col md:flex">
					<span id="namefield" className="font-bold w-20">
						<Skeleton />
					</span>
					<span
						id="levelfield"
						className="text-sm text-gh-gray-7 dark:text-gh-gray-3 pl-9"
					>
						<Skeleton />
					</span>
				</div>
				<div
					id="avatar"
					className="flex h-12 w-12 cursor-pointer items-center"
				>
					<img
						src="https://evan.beee.top/img/2023/07/04/ce77faad77bd58e5167c340f6362827c.webp"
						id="ava-img"
						className="gh-border m-0 ml-2 h-[42px] w-[42px] rounded-xl bg-gh-gray-1 p-1 dark:border-gh-gray-8 dark:bg-gh-gray-7"
						alt="Loading"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="mr-2 flex items-center md:mr-4">
			<div className="hidden flex-col md:flex">
				<span id="namefield" className="font-bold">
					{user.name}
				</span>
				<span
					id="levelfield"
					className="text-right text-sm text-gh-gray-7 dark:text-gh-gray-3"
				>
					Exp {user.exp}
				</span>
			</div>
			<div
				id="avatar"
				className="flex h-12 w-12 cursor-pointer items-center"
			>
				<img
					src={user.avatar}
					id="ava-img"
					className="gh-border m-0 ml-2 h-[42px] w-[42px] rounded-xl bg-gh-gray-1 p-1 dark:border-gh-gray-8 dark:bg-gh-gray-7"
				/>
			</div>
		</div>
	);
}
