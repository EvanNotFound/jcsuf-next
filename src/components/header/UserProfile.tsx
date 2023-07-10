"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import useLoginStatus from "@/lib/useLoginStatus";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDisclosure } from "@chakra-ui/react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useToast,
} from "@chakra-ui/react";
import {
	Button,
	TextInput,
	FormControl,
	Label,
	Textarea,
	Select,
	IconButton,
} from "@primer/react";
import { useRouter } from "next/navigation";
import {
	PencilIcon,
	CheckIcon,
	XIcon,
	CheckCircleFillIcon,
	XCircleFillIcon,
} from "@primer/octicons-react";
import formatRelativeTime from "@/utils/formatRelativeTime";
import Divider from "@/components/Divider";
import calculateLevel from "@/utils/calculateLevel";
import SignOutAuth from "@/lib/signOutAuth";
import updateDescription from "@/lib/updateDescription";
import updateGender from "@/lib/updateGender";
import updateOrien from "@/lib/updateOrien";

import renderGender from "@/utils/renderGender";
import renderOrien from "@/utils/renderOrien";

import ToastSuccessNoDesc from "@/components/toasts/SuccessNoDesc";
import ToastFailedNoDesc from "@/components/toasts/FailedNoDesc";

export default function UserProfile() {
	const { user, error, isLoading, mutate, isValidating } = useLoginStatus();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isDisabled, setIsDisabled] = useState(true);

	const [isNameEditing, setNameEditing] = useState(false);
	const [isDescEditing, setDescEditing] = useState(false);
	const [isGenderEditing, setGenderEditing] = useState(false);
	const [isOrienEditing, setOrienEditing] = useState(false);

	const [name, setName] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [gender, setGender] = useState<number>(-1);
	const [orien, setOrien] = useState<number>(-1);

	const descTextareaRef = useRef<HTMLTextAreaElement>(null);
	const nameTextInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const toastSuccess = useToast();
	const toastFailed = useToast();

	const handleSignIn = () => {
		onClose();
		setTimeout(() => {
			router.push("/auth/signin");
		}, 200);
	};

	const handleSignUp = () => {
		onClose();
		setTimeout(() => {
			router.push("/auth/signup");
		}, 200);
	};

	const handleSignOut = async () => {
		onClose();
		const res = await SignOutAuth();
		switch (res.code) {
			case 0:
				ToastSuccessNoDesc({
					toast: toastSuccess,
					message: "登出成功",
				});
				break;
			case 1:
				ToastFailedNoDesc({ toast: toastFailed, message: "登出失败" });
				break;
		}
		setTimeout(() => {
			mutate("https://api.jcsuf.top/api/loginstatus", user.uid);
		}, 500);
	};

	const handleNameEditClick = () => {
		setNameEditing(true);
	};

	const handleNameSaveClick = () => {
		setNameEditing(false);
		if (
			name != "" &&
			name != undefined &&
			name != null &&
			name != user.name
		) {
			// Perform save action or update state as needed
		} else {
			setName(user.name);
			alert("Name cannot be empty!");
		}
	};

	const handleDescEditClick = () => {
		setDescEditing(true);
		setDescription(user.desc);
	};

	useEffect(() => {
		if (isDescEditing) {
			descTextareaRef.current?.focus();
		}
	}, [isDescEditing]);

	const handleDescSaveBlur = async () => {
		setDescEditing(false);

		if (
			description != "" &&
			description != undefined &&
			description != null &&
			description != user.desc
		) {
			// console.log(description);
			const res = await updateDescription(description);
			switch (res.code) {
				case 0:
					ToastSuccessNoDesc({
						toast: toastSuccess,
						message: "更新成功",
					});
					setTimeout(() => {
						mutate(
							"https://api.jcsuf.top/api/loginstatus",
							user.desc
						);
					}, 500);
					break;
				case 1:
					ToastFailedNoDesc({
						toast: toastFailed,
						message: "更新失败",
					});
					break;
				default:
					ToastFailedNoDesc({
						toast: toastFailed,
						message: "未知错误",
					});
			}
		} else {
			setDescription(user.desc);
		}
	};

	const handleGenderClick = async () => {
		if (isGenderEditing) {
			// console.log(gender);
			const res = await updateGender(gender);
			switch (res.code) {
				case 0:
					ToastSuccessNoDesc({
						toast: toastSuccess,
						message: "更新成功",
					});
					setTimeout(() => {
						mutate(
							"https://api.jcsuf.top/api/loginstatus",
							user.sex
						);
					}, 400);
					setGenderEditing(false);
					break;
				case 1:
					ToastFailedNoDesc({
						toast: toastFailed,
						message: "更新失败",
					});
					setGenderEditing(false);
					break;
			}
		} else {
			setGenderEditing(true);
		}
	};

	const handleOrienClick = async () => {
		if (isOrienEditing) {
			// console.log(orien);
			const res = await updateOrien(orien);
			switch (res.code) {
				case 0:
					ToastSuccessNoDesc({
						toast: toastSuccess,
						message: "更新成功",
					});
					setTimeout(() => {
						mutate(
							"https://api.jcsuf.top/api/loginstatus",
							user.sex_select
						);
					}, 400);
					setOrienEditing(false);
					break;
				case 1:
					ToastFailedNoDesc({
						toast: toastFailed,
						message: "更新失败",
					});
					setOrienEditing(false);
					break;
			}
		} else {
			setOrienEditing(true);
		}
	};


	const renderNameTrailingAction = () => {
		if (isNameEditing) {
			return (
				<TextInput.Action
					onClick={handleNameSaveClick}
					icon={CheckIcon}
					aria-label="Save Name"
					sx={{ color: "fg.subtle" }}
				/>
			);
		} else {
			return (
				<TextInput.Action
					onClick={handleNameEditClick}
					icon={PencilIcon}
					aria-label="Edit Name"
					sx={{ color: "fg.subtle" }}
				/>
			);
		}
	};

	useEffect(() => {
		if (isNameEditing) {
			nameTextInputRef.current?.focus();
		}
	}, [isNameEditing]);

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
		<>
			<div className="mr-2 flex items-center md:mr-4">
				<div className="hidden flex-col md:flex">
					<span id="namefield" className="font-bold">
						{isValidating ? "游客" : user.name}
					</span>
					<span
						id="levelfield"
						className="text-right text-sm text-gh-gray-7 dark:text-gh-gray-3"
					>
						Exp {isValidating ? "0" : user.exp}
					</span>
				</div>
				<div
					id="avatar"
					className="flex h-12 w-12 cursor-pointer items-center"
					onClick={onOpen}
				>
					<img
						src={
							isValidating
								? "https://evan.beee.top/img/2023/07/04/ce77faad77bd58e5167c340f6362827c.webp"
								: user.avatar
						}
						id="ava-img"
						className="gh-border m-0 ml-2 h-[42px] w-[42px] rounded-xl bg-gh-gray-1 p-1 dark:border-gh-gray-8 dark:bg-gh-gray-7"
					/>
				</div>
			</div>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent className="rounded-l-2xl bg-gh-bg dark:bg-gh-darkbg w-52 gh-border dark:border-gh-darkborder">
					<DrawerCloseButton />
					<DrawerHeader className="flex items-center gap-3 pb-1.5">
						<img
							src={
								isValidating
									? "https://evan.beee.top/img/2023/07/04/ce77faad77bd58e5167c340f6362827c.webp"
									: user.avatar
							}
							id="ava-img"
							className="gh-border m-0 h-[42px] w-[42px] rounded-xl bg-gh-gray-1 p-1 dark:border-gh-gray-8 dark:bg-gh-gray-7"
						/>
						<div className="flex-col flex">
							<div className="text-base font-bold text-left flex items-center gap-1">
								<p className="">
									{isValidating ? (
										<Skeleton width={70} />
									) : (
										user.name
									)}
								</p>
								{user.admin_level > 0 ? (
									<Label variant="danger">Admin</Label>
								) : (
									<></>
								)}
							</div>
							<span className="text-left text-xs text-gh-gray-7 dark:text-gh-gray-3">
								Exp{" "}
								{isValidating ? (
									<Skeleton width={20} />
								) : (
									user.exp
								)}
							</span>
						</div>
					</DrawerHeader>

					<DrawerBody>
						{user.uid > 0 ? (
							<div className="flex flex-col gap-3">
								<div className="flex flex-row gap-2 items-center">
									<Label variant="success">Online</Label>
									<p className="text-sm font-semibold text-gh-text-secondary dark:text-gh-dark-text-secondary">
										Last Seen{" "}
										{formatRelativeTime(user.last_seen)}
									</p>
								</div>

								<Divider />
								{/* USER STATS */}
								<div id="user-stats-1" className="">
									<div className="flex flex-row justify-between px-2">
										<div className="flex flex-col gap-1 items-center">
											<p className="text-sm font-semibold text-gh-text-secondary dark:text-gh-dark-text-secondary">
												Likes
											</p>
											<p className="text-base font-semibold text-gh-text-primary dark:text-gh-dark-text-primary">
												{user.totallike}
											</p>
										</div>
										<div className="flex flex-col gap-1 items-center">
											<p className="text-sm font-semibold text-gh-text-secondary dark:text-gh-dark-text-secondary">
												Views
											</p>
											<p className="text-base font-semibold text-gh-text-primary dark:text-gh-dark-text-primary">
												{user.totalread}
											</p>
										</div>
										<div className="flex flex-col gap-1 items-center">
											<p className="text-sm font-semibold text-gh-text-secondary dark:text-gh-dark-text-secondary">
												Replies
											</p>
											<p className="text-base font-semibold text-gh-text-primary dark:text-gh-dark-text-primary">
												{user.totalcomment}
											</p>
										</div>
									</div>
								</div>
								<div id="user-stats-2" className="">
									<div className="flex flex-row justify-between px-2">
										<div className="flex flex-col gap-1 items-center">
											<p className="text-sm font-semibold text-gh-text-secondary dark:text-gh-dark-text-secondary">
												&nbsp;Exps
											</p>
											<p className="text-base font-semibold text-gh-text-primary dark:text-gh-dark-text-primary">
												{user.exp}
											</p>
										</div>
										<div className="flex flex-col gap-1 items-center">
											<p className="text-sm font-semibold text-gh-text-secondary dark:text-gh-dark-text-secondary">
												Posts
											</p>
											<p className="text-base font-semibold text-gh-text-primary dark:text-gh-dark-text-primary">
												{user.articles.length}
											</p>
										</div>
										<div className="flex flex-col gap-1 items-center">
											<p className="text-sm font-semibold text-gh-text-secondary dark:text-gh-dark-text-secondary">
												&nbsp;Level&nbsp;
											</p>
											<p className="text-base font-semibold text-gh-text-primary dark:text-gh-dark-text-primary">
												{calculateLevel(user.exp)}
											</p>
										</div>
									</div>
								</div>

								<Divider />
								<FormControl>
									<FormControl.Label>
										<p className="text-gh-text-secondary dark:text-gh-dark-text-secondary">
											Name
										</p>
									</FormControl.Label>
									<TextInput
										block
										onChange={(e) =>
											setName(e.target.value)
										}
										ref={nameTextInputRef}
										placeholder={user.name}
										disabled={!isNameEditing}
										trailingAction={renderNameTrailingAction()}
									/>
								</FormControl>
								<FormControl>
									<FormControl.Label>
										<p className="text-gh-text-secondary dark:text-gh-dark-text-secondary">
											Description
										</p>
									</FormControl.Label>
									{isDescEditing ? (
										<div className="flex flex-row justify-between">
											<Textarea
												block
												onChange={(e) =>
													setDescription(
														e.target.value
													)
												}
												ref={descTextareaRef}
												placeholder={user.desc}
												onBlur={handleDescSaveBlur}
												value={description}
											/>
										</div>
									) : (
										<div onClick={handleDescEditClick}>
											<Textarea
												block
												ref={descTextareaRef}
												onClick={handleDescEditClick}
												placeholder={user.desc}
												disabled={!isDescEditing}
												className="!cursor-pointer"
											/>
										</div>
									)}
								</FormControl>
								<div className="flex gap-3">
									<div className="w-1/2">
										<FormControl>
											<FormControl.Label>
												<div className="flex items-center">
													<p className="text-gh-text-secondary dark:text-gh-dark-text-secondary">
														Gender
													</p>
													<IconButton
														onClick={
															handleGenderClick
														}
														className="ml-0.5"
														size="small"
														icon={
															isGenderEditing
																? CheckIcon
																: PencilIcon
														}
														variant="invisible"
														aria-label="Change Gender"
													/>
												</div>
											</FormControl.Label>
											{isGenderEditing ? (
												<Select
													onChange={(e) =>
														setGender(
															Number(
																e.target.value
															)
														)
													}
													value={gender}
												>
													<Select.Option value="0">
														Male
													</Select.Option>
													<Select.Option value="1">
														Female
													</Select.Option>
													<Select.Option value="2">
														Non-binary
													</Select.Option>
													<Select.Option value="3">
														Unclear
													</Select.Option>
													<Select.Option value="4">
														Other
													</Select.Option>
													<Select.Option value="5">
														Rather Not Say
													</Select.Option>
													<Select.Option
														value="6"
														disabled
													>
														Walmart Bag
													</Select.Option>
													<Select.Option
														value="8"
														disabled
													>
														Apache Helicopter
													</Select.Option>
													<Select.Option
														value="9"
														disabled
													>
														Attack Helicopter
													</Select.Option>
													<Select.Option
														value="10"
														disabled
													>
														Submarine
													</Select.Option>
													<Select.Option
														value="11"
														disabled
													>
														Firetruck
													</Select.Option>
													<Select.Option
														value="12"
														disabled
													>
														Boeing 747
													</Select.Option>
													<Select.Option
														value="12"
														disabled
													>
														Boeing 737
													</Select.Option>
													<Select.Option
														value="13"
														disabled
													>
														Boeing 787 Dreamliner
													</Select.Option>
													<Select.Option
														value="14"
														disabled
													>
														Boeing 777
													</Select.Option>
													<Select.Option
														value="15"
														disabled
													>
														Airbus A380
													</Select.Option>
													<Select.Option
														value="16"
														disabled
													>
														Airbus A319
													</Select.Option>
													<Select.Option
														value="17"
														disabled
													>
														Airbus A320
													</Select.Option>
													<Select.Option
														value="18"
														disabled
													>
														Airbus A321
													</Select.Option>
													<Select.Option
														value="19"
														disabled
													>
														Concorde
													</Select.Option>
													<Select.Option
														value="20"
														disabled
													>
														Douglas DC-3
													</Select.Option>
													<Select.Option
														value="21"
														disabled
													>
														Cessna 172
													</Select.Option>
													<Select.Option
														value="22"
														disabled
													>
														没错，我是煞笔
													</Select.Option>
												</Select>
											) : (
												<p className="text-base font-semibold text-gh-text-primary dark:text-gh-dark-text-primary !mt-0">
													{isValidating
														? renderGender(gender)
														: renderGender(
																user.sex
														  )}
												</p>
											)}
										</FormControl>
									</div>
									<div className="w-1/2">
										<FormControl>
											<FormControl.Label>
											<div className="flex items-center">
													<p className="text-gh-text-secondary dark:text-gh-dark-text-secondary">
														Orientation
													</p>
													<IconButton
														onClick={
															handleOrienClick
														}
														className="ml-0.5"
														size="small"
														icon={
															isOrienEditing
																? CheckIcon
																: PencilIcon
														}
														variant="invisible"
														aria-label="Change Gender"
													/>
												</div>
											</FormControl.Label>
											{isOrienEditing ? (
												<Select
													onChange={(e) =>
														setOrien(
															Number(
																e.target.value
															)
														)
													}
													value={orien}
												>
													<Select.Option value="0">
														Male
													</Select.Option>
													<Select.Option value="1">
														Female
													</Select.Option>
													<Select.Option value="2">
														Bisexual
													</Select.Option>
													<Select.Option value="3">
														Aromantic
													</Select.Option>
													<Select.Option value="4">
														Unclear
													</Select.Option>
													<Select.Option value="5">
														Other
													</Select.Option>
													<Select.Option value="6">
														Rather Not Say
													</Select.Option>
													<Select.Option
														value="8"
														disabled
													>
														Walmart Bag
													</Select.Option>
													<Select.Option
														value="9"
														disabled
													>
														Attack Helicopter
													</Select.Option>
													<Select.Option
														value="10"
														disabled
													>
														Submarine
													</Select.Option>
													<Select.Option
														value="11"
														disabled
													>
														Firetruck
													</Select.Option>
													<Select.Option
														value="12"
														disabled
													>
														Boeing 747
													</Select.Option>
													<Select.Option
														value="12"
														disabled
													>
														Boeing 737
													</Select.Option>
													<Select.Option
														value="13"
														disabled
													>
														Boeing 787 Dreamliner
													</Select.Option>
													<Select.Option
														value="14"
														disabled
													>
														Boeing 777
													</Select.Option>
													<Select.Option
														value="15"
														disabled
													>
														Airbus A380
													</Select.Option>
													<Select.Option
														value="16"
														disabled
													>
														Airbus A319
													</Select.Option>
													<Select.Option
														value="17"
														disabled
													>
														Airbus A320
													</Select.Option>
													<Select.Option
														value="18"
														disabled
													>
														Airbus A321
													</Select.Option>
													<Select.Option
														value="19"
														disabled
													>
														Concorde
													</Select.Option>
													<Select.Option
														value="20"
														disabled
													>
														Douglas DC-3
													</Select.Option>
													<Select.Option
														value="21"
														disabled
													>
														Cessna 172
													</Select.Option>
													<Select.Option
														value="22"
														disabled
													>
														没错，我喜欢煞笔
													</Select.Option>
												</Select>
											) : (
												<p className="text-base font-semibold text-gh-text-primary dark:text-gh-dark-text-primary !mt-0">
													{isValidating
														? renderOrien(gender)
														: renderOrien(
																user.sex_select
														  )}
												</p>
											)}
										</FormControl>
									</div>
								</div>
							</div>
						) : user.uid == undefined ? (
							<Skeleton height={600} />
						) : (
							<div className="h-full flex flex-center items-center justify-center">
								<p className="text-center font-bold">
									Welcome to JCSUF
								</p>
							</div>
						)}
					</DrawerBody>

					<DrawerFooter className="flex flex-col gap-2">
						{user.uid < 0 ? (
							<>
								<Button
									variant="primary"
									onClick={handleSignUp}
									block
								>
									Sign up
								</Button>
								<Button
									variant="invisible"
									onClick={handleSignIn}
									block
								>
									Sign In
								</Button>
							</>
						) : (
							<Button
								variant="default"
								onClick={handleSignOut}
								block
							>
								Sign Out
							</Button>
						)}
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
