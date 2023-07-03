"use client";
import { TextInput } from "@primer/react";
import { SearchIcon } from "@primer/octicons-react";

export default function SearchBox() {
	return (
		<div
			className=""
			id="category-displayer"
		>
            <TextInput aria-label="Search" placeholder="搜索帖子" id="search-content" leadingVisual={<SearchIcon />}/>
		</div>

	);
}
