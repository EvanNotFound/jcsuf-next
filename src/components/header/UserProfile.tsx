"use client";
import React from "react";
import { useState, useRef, useEffect} from "react";
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
} from "@chakra-ui/react";
import { Button, TextInput, FormControl, Label, Textarea } from "@primer/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PencilIcon, CheckIcon } from "@primer/octicons-react";
import formatRelativeTime from "@/utils/formatRelativeTime";
import Divider from "@/components/Divider";
import calculateLevel from "@/utils/calculateLevel";

export default function UserProfile() {
	const { user, error, isLoading } = useLoginStatus();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isDisabled, setIsDisabled] = useState(true);
	const [isNameEditing, setNameEditing] = useState(false);
	const [isDescEditing, setDescEditing] = useState(false);
	const [name, setName] = useState<string>();
	const [description, setDescription] = useState<string>();
	const descTextareaRef = useRef<HTMLTextAreaElement>(null);
	const nameTextInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	console.log(user);

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

	const handleSignOut = () => {
		onClose();
		setTimeout(() => {
			router.push("/");
		}, 200);
	};

	const handleNameEditClick = () => {
		setNameEditing(true);
	};
	
	const handleDescEditClick = () => {
		setDescEditing(true);
	};

	useEffect(() => {
		if (isDescEditing) {
			descTextareaRef.current?.focus();
		}
	  }, [isDescEditing]);

	const handleNameSaveClick = () => {
		setNameEditing(false);
		if (name != "" && name != undefined && name != null && name != user.name) {
			// Perform save action or update state as needed
		} else {
			setName(user.name);
			alert("Name cannot be empty!");
		}
	};

	const handleDescSaveBlur = () => {
		setDescEditing(false);
		if (description != "" && description != undefined && description != null && description != user.desc) {
			// Perform save action or update state as needed
		} else {
			setDescription(user.desc);
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
					onClick={onOpen}
				>
					<img
						src={user.avatar}
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
							src={user.avatar}
							id="ava-img"
							className="gh-border m-0 h-[42px] w-[42px] rounded-xl bg-gh-gray-1 p-1 dark:border-gh-gray-8 dark:bg-gh-gray-7"
						/>
						<div className="flex-col flex">
							<div className="text-base font-bold text-left flex items-center gap-1">
								<p className="">{user.name}</p>
								{user.admin_level > 0 ? (
									<Label variant="danger">Admin</Label>
								) : (
									<></>
								)}
							</div>
							<span className="text-left text-xs text-gh-gray-7 dark:text-gh-gray-3">
								Exp {user.exp}
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
												Levels&nbsp;
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
											/>
										</div>
									) : (
										<div onClick={handleDescEditClick} >
											<Textarea
												block
												ref={descTextareaRef}
												onClick={handleDescEditClick}
												placeholder={user.desc}
												disabled={!isDescEditing}
												className="!cursor-pointer"
											/>
										</div>
									)

									}
									
								</FormControl>
							</div>
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
