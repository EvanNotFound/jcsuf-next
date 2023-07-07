"use client";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as GHThemeProvider } from "@primer/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return <>{children}</>;

	return (
            <ThemeProvider attribute="class">
                <GHThemeProvider>
                    <CacheProvider>
                        <ChakraProvider>{children}</ChakraProvider>
                    </CacheProvider>
                </GHThemeProvider>
            </ThemeProvider>
	);
}
