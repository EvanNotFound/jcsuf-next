import Link from "next/link";
import ThemeSwitcher from "@/components/header/ThemeSwitcher";
import UserProfile from "@/components/header/UserProfile";
import SearchBox from "@/components/header/SearchBox";

export default function Header() {

	return (
		<header
			className="fixed left-0 top-0 z-40 flex h-20 w-full-no-cls items-center justify-between border-b-[1.5px] border-gh-border bg-gh-bg p-4 backdrop-blur-xl dark:border-gh-darkborder dark:bg-gh-darkbg"
			id="nav-bar"
		>
			<section id="site_title" className="ml-0 md:ml-5">
				<h1 className="text-xl font-bold">
					<Link href="/" title="首页" className="hover:no-underline">
						JCSS 非官方自由论坛
					</Link>
				</h1>
			</section>
			<section id="right" className="flex justify-self-end">
				<div className="flex items-center">
					<nav
						id="desktop"
						className="mr-6 hidden items-center gap-5 text-base md:flex"
					>
						{/* <SearchBox /> */}
						<a
							href="/post"
							title="帖子专区"
							className="hover:no-underline"
						>
							帖子专区
						</a>
						<a
							href="/contact"
							title="联系管理员"
							className="hover:no-underline"
						>
							联系管理员
						</a>
						<ThemeSwitcher />
                        <UserProfile />
					</nav>
					<button
						id="mobile-menu-btn"
						className="gh-border mr-1 block rounded-xl px-2.5 py-2 focus:bg-white dark:border-gh-darkborder dark:focus:bg-gh-subtledarkbg md:hidden"
					>
						<i className="fa-regular fa-compass fa-lg"></i>
					</button>
				</div>

				<section id="mobile-menu" className="absolute hidden w-full">
					<button className="rounded-lg p-3">
						<i className="fa-solid fa-bars fa-lg"></i>
					</button>
					<nav
						className="mr-6 flex min-h-screen items-center gap-5 text-base md:hidden"
						aria-label="mobile"
					></nav>
				</section>
			</section>
		</header>
	);
}
