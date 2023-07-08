"use client";
import {
	Box,
	FormControl,
	TextInput,
	Button,
	Link,
	IconButton,
} from "@primer/react";
import { use, useState } from "react";
import signUpAuth from "@/lib/signUpAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import {
	CheckCircleFillIcon,
	XIcon,
	XCircleFillIcon,
} from "@primer/octicons-react";

export default function SignUpBox() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordFocused, setPasswordFocused] = useState(false);
	const router = useRouter();

    //Toast Part
    const toastSuccess = useToast();
    const toastSignUpErr1 = useToast();
    const toastSignUpErr2 = useToast();
    const toastUsernameErr = useToast();
    const toastEmailErr = useToast();
    const toastPasswordErr = useToast();
    const toastConfirmPasswordErr = useToast();


	const [passwordError, setPasswordError] = useState("");

	const handlePasswordChange = (e: any) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
	};

	const handleConfirmPasswordChange = (e: any) => {
		const newConfirmPassword = e.target.value;
		setConfirmPassword(newConfirmPassword);
		setPasswordMatch(newConfirmPassword === password);
	};

	const validateUsername = () => {
		if (username.length > 16) {
			setUsernameError("Username must not exceed 16 characters");
			return false;
		}
		if (username.length < 3) {
			setUsernameError("Username must be at least 3 characters");
			return false;
		}
		setUsernameError("");
		return true;
	};

	const validateEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setEmailError("Invalid email format");
			return false;
		}
		setEmailError("");
		return true;
	};

	const validatePassword = () => {
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
		const isValidPassword = passwordRegex.test(password);
		if (!isValidPassword && passwordError !== "Invalid password format") {
			setPasswordError("Invalid password format");
		} else if (isValidPassword && passwordError !== "") {
			setPasswordError("");
		}

		return {
			uppercase: /[A-Z]/.test(password),
			lowercase: /[a-z]/.test(password),
			number: /\d/.test(password),
			length: password.length >= 6,
			valid: isValidPassword,
		};
	};

	const renderPasswordRequirements = () => {
		if (passwordFocused) {
			const passwordValidation = validatePassword();
			return (
				<ul className="text-sm">
					<li
						className={
							passwordValidation.number
								? "text-gh-green-5 flex items-center"
								: "text-gh-red-5 flex items-center"
						}
					>
						{passwordValidation.number ? (
							<CheckCircleFillIcon size={12} className="mr-1" />
						) : (
							<XCircleFillIcon size={12} className="mr-1" />
						)}
						<p>Include a number</p>
					</li>
					<li
						className={
							passwordValidation.uppercase
								? "text-gh-green-5 flex items-center"
								: "text-gh-red-5 flex items-center"
						}
					>
						{passwordValidation.uppercase ? (
							<CheckCircleFillIcon size={12} className="mr-1" />
						) : (
							<XCircleFillIcon size={12} className="mr-1" />
						)}
						<p>Include an uppercase letter</p>
					</li>
					<li
						className={
							passwordValidation.lowercase
								? "text-gh-green-5 flex items-center"
								: "text-gh-red-5 flex items-center"
						}
					>
						{passwordValidation.lowercase ? (
							<CheckCircleFillIcon size={12} className="mr-1" />
						) : (
							<XCircleFillIcon size={12} className="mr-1" />
						)}
						<p>Include a lowercase letter</p>
					</li>
					<li
						className={
							passwordValidation.length
								? "text-gh-green-5 flex items-center"
								: "text-gh-red-5 flex items-center"
						}
					>
						{passwordValidation.length ? (
							<CheckCircleFillIcon size={12} className="mr-1" />
						) : (
							<XCircleFillIcon size={12} className="mr-1" />
						)}
						<p>Be longer than 6 characters</p>
					</li>
				</ul>
			);
		}
		return null;
	};

	const handleSignUp = async () => {
		if (username == "" || usernameError) {
			const closeToastUsernameErr = () => {
                toastUsernameErr.closeAll();
            }
            toastUsernameErr({
                position: "top-right",
                duration: 3500,
                render: () => (
                    <div className="border border-solid border-gh-red-7/10 p-3 dark:border-gh-red-3/10 bg-gh-red-0 dark:bg-gh-red-9 rounded-lg flex flex-row items-center justify-between relative top-20">
                        <div>
                            <h3 className="font-bold text-gh-red-9 flex items-center">
                                <XCircleFillIcon
                                    size={16}
                                    className="text-gh-red-6 mr-2"
                                />
                                注册失败
                            </h3>
                            <p className="ml-6 text-gh-red-5 text-sm p-0">
                                用户名不合法
                            </p>
                        </div>
                        <div>
                            <IconButton
                                aria-label="Close"
                                icon={XIcon}
                                onClick={closeToastUsernameErr}
                                variant="invisible"
                            />
                        </div>
                    </div>
                ),
            });
			return;
		}

		if (email == "" || emailError) {
			const closeToastEmailErr = () => {
                toastEmailErr.closeAll();
            }
            toastEmailErr({
                position: "top-right",
                duration: 3500,
                render: () => (
                    <div className="border border-solid border-gh-red-7/10 p-3 dark:border-gh-red-3/10 bg-gh-red-0 dark:bg-gh-red-9 rounded-lg flex flex-row items-center justify-between relative top-20">
                        <div>
                            <h3 className="font-bold text-gh-red-9 flex items-center">
                                <XCircleFillIcon
                                    size={16}
                                    className="text-gh-red-6 mr-2"
                                />
                                注册失败
                            </h3>
                            <p className="ml-6 text-gh-red-5 text-sm p-0">
                                邮箱不合法
                            </p>
                        </div>
                        <div>
                            <IconButton
                                aria-label="Close"
                                icon={XIcon}
                                onClick={closeToastEmailErr}
                                variant="invisible"
                            />
                        </div>
                    </div>
                ),
            });
			return;
		}

		if (password == "" || passwordError) {
			const closeToastPasswordErr = () => {
                toastPasswordErr.closeAll();
            }
            toastPasswordErr({
                position: "top-right",
                duration: 3500,
                render: () => (
                    <div className="border border-solid border-gh-red-7/10 p-3 dark:border-gh-red-3/10 bg-gh-red-0 dark:bg-gh-red-9 rounded-lg flex flex-row items-center justify-between relative top-20">
                        <div>
                            <h3 className="font-bold text-gh-red-9 flex items-center">
                                <XCircleFillIcon
                                    size={16}
                                    className="text-gh-red-6 mr-2"
                                />
                                注册失败
                            </h3>
                            <p className="ml-6 text-gh-red-5 text-sm p-0">
                                密码不合法
                            </p>
                        </div>
                        <div>
                            <IconButton
                                aria-label="Close"
                                icon={XIcon}
                                onClick={closeToastPasswordErr}
                                variant="invisible"
                            />
                        </div>
                    </div>
                ),
            });
			return;
		}

		if (confirmPassword == "" || !passwordMatch) {
			const closeToastConfirmPasswordErr = () => {
                toastConfirmPasswordErr.closeAll();
            }
            toastConfirmPasswordErr({
                position: "top-right",
                duration: 3500,
                render: () => (
                    <div className="border border-solid border-gh-red-7/10 p-3 dark:border-gh-red-3/10 bg-gh-red-0 dark:bg-gh-red-9 rounded-lg flex flex-row items-center justify-between relative top-20">
                        <div>
                            <h3 className="font-bold text-gh-red-9 flex items-center">
                                <XCircleFillIcon
                                    size={16}
                                    className="text-gh-red-6 mr-2"
                                />
                                注册失败
                            </h3>
                            <p className="ml-6 text-gh-red-5 text-sm p-0">
                                密码不匹配
                            </p>
                        </div>
                        <div>
                            <IconButton
                                aria-label="Close"
                                icon={XIcon}
                                onClick={closeToastConfirmPasswordErr}
                                variant="invisible"
                            />
                        </div>
                    </div>
                ),
            });
			return;
		}

		const res = await signUpAuth({ username, email, password });
		switch (res.code) {
			case 0:
				const closeToastSuccess = () => {
					toastSuccess.closeAll();
				};
				toastSuccess({
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
									注册成功
								</h3>
                                <p className="ml-6 text-gh-green-5 text-sm p-0">
                                    欢迎，{username}
                                </p>
							</div>
							<div>
								<IconButton
									aria-label="Close"
									icon={XIcon}
									onClick={closeToastSuccess}
									variant="invisible"
								/>
							</div>
						</div>
					),
				});
				setTimeout(() => {
					router.push("/");
				}, 500);
				break;
			case 1:
				const closeToastSignUpErr1 = () => {
					toastSignUpErr1.closeAll();
				};
				toastSignUpErr1({
					position: "top-right",
					duration: 3500,
					render: () => (
						<div className="border border-solid border-gh-red-7/10 p-3 dark:border-gh-red-3/10 bg-gh-red-0 dark:bg-gh-red-9 rounded-lg flex flex-row items-center justify-between relative top-20">
							<div>
								<h3 className="font-bold text-gh-red-9 flex items-center">
									<XCircleFillIcon
										size={16}
										className="text-gh-red-6 mr-2"
									/>
									注册失败
								</h3>
								<p className="ml-6 text-gh-red-5 text-sm p-0">
									邮箱已存在
								</p>
							</div>
							<div>
								<IconButton
									aria-label="Close"
									icon={XIcon}
									onClick={closeToastSignUpErr1}
									variant="invisible"
								/>
							</div>
						</div>
					),
				});
				break;
			case 2:
				const closeToastSignUpErr2 = () => {
					toastSignUpErr2.closeAll();
				};
				toastSignUpErr2({
					position: "top-right",
					duration: 3500,
					render: () => (
						<div className="border border-solid border-gh-red-7/10 p-3 dark:border-gh-red-3/10 bg-gh-red-0 dark:bg-gh-red-9 rounded-lg flex flex-row items-center justify-between relative top-20">
							<div>
								<h3 className="font-bold text-gh-red-9 flex items-center">
									<XCircleFillIcon
										size={16}
										className="text-gh-red-6 mr-2"
									/>
									注册失败
								</h3>
								<p className="ml-6 text-gh-red-5 text-sm p-0">
									邮箱名不合法
								</p>
							</div>
							<div>
								<IconButton
									aria-label="Close"
									icon={XIcon}
									onClick={closeToastSignUpErr2}
									variant="invisible"
								/>
							</div>
						</div>
					),
				});
		}
	};

	return (
		<Box>
			<section className="">
				<form action="" className="flex flex-col gap-2">
					<FormControl>
						<FormControl.Label>
							<p className={usernameError ? "text-gh-red-5" : ""}>
								Username
							</p>
						</FormControl.Label>
						<TextInput
							sx={{ width: "100%" }}
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							onBlur={validateUsername}
							validationStatus={
								usernameError ? "error" : undefined
							}
						/>
						{usernameError && (
							<span className="text-gh-red-5 text-sm p-0">
								{usernameError}
							</span>
						)}
					</FormControl>
					<FormControl>
						<FormControl.Label>
							<p className={emailError ? "text-gh-red-5" : ""}>
								Email
							</p>
						</FormControl.Label>
						<TextInput
							sx={{ width: "100%" }}
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={validateEmail}
							validationStatus={emailError ? "error" : undefined}
						/>
						{emailError && (
							<span className="text-gh-red-5 text-sm p-0">
								{emailError}
							</span>
						)}
					</FormControl>
					<FormControl>
						<FormControl.Label>
							<p className={passwordError ? "text-gh-red-5" : ""}>
								Password
							</p>
						</FormControl.Label>
						<TextInput
							sx={{ width: "100%" }}
							type="password"
							value={password}
							onChange={handlePasswordChange}
							onFocus={() => setPasswordFocused(true)}
							validationStatus={
								passwordError ? "error" : undefined
							}
							//onBlur={() => setPasswordFocused(false)}
						/>
						{renderPasswordRequirements()}
					</FormControl>
					<FormControl>
						<FormControl.Label>
							<p className={passwordMatch ? "" : "text-gh-red-5"}>
								Confirm Password
							</p>
						</FormControl.Label>
						<TextInput
							sx={{ width: "100%" }}
							type="password"
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
							onFocus={() => setPasswordFocused(false)}
							validationStatus={
								passwordMatch ? undefined : "error"
							}
							className={passwordMatch ? "" : "text-gh-red-5"}
						/>
						{!passwordMatch && (
							<span className="text-gh-red-5 text-sm p-0">
								Passwords do not match
							</span>
						)}
					</FormControl>

					<div className="flex justify-center mt-2 gap-3">
						<Button variant="primary" block onClick={handleSignUp}>
							Sign up
						</Button>
					</div>
				</form>
			</section>
		</Box>
	);
}
