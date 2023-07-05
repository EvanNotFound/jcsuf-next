"use client";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as GHThemeProvider } from "@primer/react";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return <>{children}</>;

	return (
		<ThemeProvider attribute="class">
			<GHThemeProvider>{children}</GHThemeProvider>
		</ThemeProvider>
	);
}
