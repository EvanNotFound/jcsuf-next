"use client"
import React from "react";
import { TextInput } from "@primer/react";
import { SearchIcon } from "@primer/octicons-react";

export default function SearchBox() {
	return (
		<div
			className=""
			id="category-displayer"
		>
			{/* Github Bug:  trailingVisual={SearchIcon} */}
            <TextInput aria-label="Search" placeholder="搜索帖子" id="search-content" />
		</div>

	);
}
