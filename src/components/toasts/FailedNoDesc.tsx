"use client";
import React from "react";
import { Button } from "@primer/react";
import {
	XIcon,
	XCircleFillIcon,
} from "@primer/octicons-react";

type Props = {
	toast: any,
	message: string,
};

export default function ToastFailedNoDesc(props : Props) {

	const closeToast = () => {
		props.toast.closeAll();
	};
	props.toast({
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
						{props.message}
					</h3>
				</div>
				<div>
					<Button
						variant="invisible"
						onClick={closeToast}
					>
						<XIcon
							size={16}
							className="text-gh-red-6"
						/>
					</Button>
				</div>
			</div>
		),
	});

}