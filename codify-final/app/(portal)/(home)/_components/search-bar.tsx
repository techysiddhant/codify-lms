"use client";
import { Loader } from "@/components/loader";
import { SearchInput } from "@/components/search-input";
import { Suspense } from "react";
export function Searchbar() {
	return (
		// You could have a loading skeleton as the `fallback` too
		<Suspense fallback={<h2>Loading...</h2>}>
			<SearchInput />
		</Suspense>
	);
}
