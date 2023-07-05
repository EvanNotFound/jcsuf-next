"use client";

import { Box, FormControl, TextInput, Button, Link } from "@primer/react";
import { useState } from "react";
import signInAuth from "@/lib/signInAuth";
import { useRouter } from 'next/navigation'

export default function SignInBox() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleSignIn = async () => {
		const res = await signInAuth({ email, password });
		switch (res.code) {
			case 0:
				router.push("/");
                break;
            case 1 || 2:
                alert("邮箱或密码错误");
		}
	};

	return (
		<Box>
			<section>
				<form className="flex flex-col gap-2">
					<FormControl id="email">
						<FormControl.Label>Email</FormControl.Label>
						<TextInput
							sx={{ width: "100%" }}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							autoFocus
						/>
					</FormControl>
					<FormControl id="password">
						<FormControl.Label>Password</FormControl.Label>
						<TextInput
							sx={{ width: "100%" }}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
						/>
					</FormControl>
					<div className="flex justify-center mt-2 gap-3">
						<Button variant="primary" block onClick={handleSignIn}>
							Sign In
						</Button>
					</div>
				</form>
			</section>
		</Box>
	);
}

// const Signin = ({ providers }) => {
//     const email = useRef("");
//     const password = useRef("");
//     return (
//         <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
//             <div
//                 className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
//             >
//                 <div
//                     className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
//                 >
//                     <div className="my-3 text-4xl font-bold tracking-wider text-center">
//                         <a href="#">LOGROCKET</a>
//                     </div>
//                     <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//                     </p>
//                     <p className="flex flex-col items-center justify-center mt-10 text-center">
//                         <span>Don't have an account?</span>
//                         <a href="#" className="underline">Get Started!</a>
//                     </p>
//                     <p className="mt-6 text-sm text-center text-gray-300">
//                         Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
//                     </p>
//                 </div>
//                 <div className="p-5 bg-white md:flex-1">
//                     <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
//                     <form action="#" className="flex flex-col space-y-5">
//                         <div className="flex flex-col space-y-1">
//                             <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 autoFocus
//                                 className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
//                                 onChange={(e) => (email.current = e.target.value)}
//                             />
//                         </div>
//                         <div className="flex flex-col space-y-1">
//                             <div className="flex items-center justify-between">
//                                 <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
//                                 <a href="#" className="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
//                             </div>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
//                                 onChange={(e) => (password.current = e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <button
//                                 type="button"
//                                 className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
//                                 onClick={() => signIn("credentials", {
//                                     email: email.current, password: password.current,
//                                 })}
//                             >
//                                 Log in
//                             </button>
//                         </div>
//                         <div className="flex flex-col space-y-5">
//                             <span className="flex items-center justify-center space-x-2">
//                                 <span className="h-px bg-gray-400 w-14"></span>
//                                 <span className="font-normal text-gray-500">or login with</span>
//                                 <span className="h-px bg-gray-400 w-14"></span>
//                             </span>
//                             <div className="flex flex-col space-y-4">
//                                 {providers &&
//                                     Object.values(providers).map(provider => {
//                                         if (provider.name !== "Credentials") {
//                                             return (
//                                                 <div key={provider.name} style={{ marginBottom: 0 }}>
//                                                     <a
//                                                         href="#"
//                                                         className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
//                                                         onClick={() => signIn(provider.id)}
//                                                     >
//                                                         <span>
//                                                             <svg
//                                                                 className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
//                                                                 viewBox="0 0 16 16"
//                                                                 version="1.1"
//                                                                 aria-hidden="true"
//                                                             >
//                                                                 <path
//                                                                     d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
//                                                                 ></path>
//                                                             </svg>
//                                                         </span>
//                                                         <span className="text-sm font-medium text-gray-800 group-hover:text-white">Sign in with{' '} {provider.name}</span>
//                                                     </a>
//                                                 </div>
//                                             )
//                                         }
//                                     })}
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Signin
// export async function getServerSideProps(context) {
//     const { req } = context;
//     const session = await getSession({ req });
//     const providers = await getProviders()
//     if (session) {
//         return {
//             redirect: { destination: "/" },
//         };
//     }
//     return {
//         props: {
//             providers,
//         },
//     }
// }
