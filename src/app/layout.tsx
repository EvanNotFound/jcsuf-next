import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import Providers from "@/app/providers";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "JCSS 非官方自由论坛 - JCSUF",
	description: "JCSS 非官方自由论坛 - JCSUF",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			{/* <head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link rel="stylesheet" type="text/css" href="index.css" />
				<link rel="stylesheet" type="text/css" href="style.css" />
				<link rel="preconnect" href="https://evan.beee.top" />
				<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
				<title>JCSS 非官方自由论坛 - JCSUF</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="shortcut icon"
					href="https://jcsuf.evanluo.top/assets/favicon-djkuvjux.png"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://evan.beee.top/css/fontawesome-pro-6.2.1/css/solid.min.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://evan.beee.top/css/fontawesome-pro-6.2.1/css/regular.min.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://evan.beee.top/css/fontawesome-pro-6.2.1/css/fontawesome.min.css"
				/>

				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1743182420249575"
					crossOrigin="anonymous"
				></Script>
			</head> */}

			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
