"use client";

import { Box, FormControl, TextInput, Button, Link, IconButton} from "@primer/react";
import { useState } from "react";
import signInAuth from "@/lib/signInAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { CheckCircleFillIcon, XIcon } from "@primer/octicons-react";

export default function SignInBox() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const toast = useToast();

	const handleSignIn = async () => {
		const res = await signInAuth({ email, password });
		switch (res.code) {
			case 0:
                const closeToast = () => {
                    toast.closeAll()
                }
				toast({
					position: "top-right",
					duration: 3500,
					render: () => (
						<div className="border border-solid border-gh-green-7/10 p-3 dark:border-gh-green-3/10 bg-gh-green-0 dark:bg-gh-green-9 rounded-lg flex flex-row items-center justify-between relative top-20">
							<div>
								<h3 className="font-bold text-gh-green-9 flex items-center">
									<CheckCircleFillIcon
										size={16}
										className="text-gh-green-6 mr-2"
									/>
									登录成功
								</h3>
							</div>
                            <div>
                                <IconButton aria-label="Close" icon={XIcon} onClick={closeToast} variant="invisible"/>
                            </div>
						</div>
					),
				});

                setTimeout(() => {
                    router.push('/')
                }, 500)
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
