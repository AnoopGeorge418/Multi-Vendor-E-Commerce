import type { Metadata } from "next";
import { Playfair_Display, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
	display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
	subsets: ["latin"],
	variable: "--font-atkinson",
	weight: ["400", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "Rivora – Smart AI E-Commerce Platform",
		template: "%s | Rivora",
	},
	description:
		"Rivora is a modern AI-powered multi-vendor e-commerce platform delivering fast, secure, and personalized shopping experiences with intelligent product discovery and seamless checkout.",
	keywords: [
		"AI ecommerce",
		"multi vendor marketplace",
		"online shopping platform",
		"smart commerce",
	],
	authors: [{ name: "Anoop George" }],
	openGraph: {
		title: "Rivora – Smart AI Commerce",
		description:
			"A premium AI-powered multi-vendor ecommerce platform built for scalability and performance.",
		type: "website",
		locale: "en_US",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<body
				className={`
          ${playfair.variable}
          ${atkinson.variable}
          antialiased
          bg-white
          text-black
        `}>
				{children}
			</body>
		</html>
	);
}
