"use client";
import React from "react";

import { Button } from "@primer/react";
import {
	XIcon,
	CheckCircleFillIcon,
} from "@primer/octicons-react";

type Props = {
	toast: any;
	message: string;
};

export default function ToastSuccessNoDesc(props: Props) {
	const closeToast = () => {
		props.toast.closeAll();
	};
	props.toast({
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
						{props.message}
					</h3>
				</div>
				<div>
					<Button variant="invisible" onClick={closeToast}>
						<XIcon size={16} className="text-gh-green-6" />
					</Button>
				</div>
			</div>
		),
	});
}
