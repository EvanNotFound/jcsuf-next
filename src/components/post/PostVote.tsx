'use client'
import { ArrowUpIcon, ArrowDownIcon } from "@primer/octicons-react";
import { IconButton } from "@primer/react";

export default function PostVote({ like, dislike, avatar } : { like: number, dislike: number, avatar: string}) {
	return (
		<div
			id="votes"
			className="flex flex-col justify-between gap-5 w-[70px] pr-3 border-r border-solid border-gh-border dark:border-gh-gray-8 pb-3 pt-2.5"
		>
            <div className="flex flex-row justify-center items-center">
                <div className=" p-0.5 gh-border rounded-xl">
                    <img src={avatar} alt="" className="w-11 h-11 rounded-[9.2px]"/>
                </div>
                
            </div>
			<div className="flex flex-col justify-center items-center gap-1">
				<div className="flex flex-row items-center gap-1">
					<IconButton aria-label="Like" icon={ArrowUpIcon} />

				</div>
                <p className="text-md text-gh-gray-8 dark:text-gh-gray-2">
					{like - dislike}
				</p>
				<div className="flex flex-row items-center gap-1">
					<IconButton aria-label="Dislike" icon={ArrowDownIcon} />
				</div>
			</div>
		</div>
	);
}
