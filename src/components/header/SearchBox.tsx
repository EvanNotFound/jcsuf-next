"use client"
import React from "react";
import { TextInput } from "@primer/react";

export default async function SearchBox() {
	return (
		<div>
			{/* Github Bug:  trailingVisual={SearchIcon} */}
            <TextInput aria-label="Search" placeholder="搜索帖子" />
		</div>

	);
}
