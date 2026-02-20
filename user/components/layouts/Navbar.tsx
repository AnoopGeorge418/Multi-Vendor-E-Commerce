"use client";

import { AppIcon } from "../AppIcon";
import { AppLogo } from "../AppLogo";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
	CommandDialog,
	CommandInput,
	CommandList,
	CommandItem,
	CommandEmpty,
} from "@/components/ui/command";
import { Button } from "../ui/button";

export const Navbar = () => {
	const router = useRouter();

	const [open, setOpen] = useState(false);
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	// Rotating search items
	const [placeholderIndex, setPlaceholderIndex] = useState(0);
	const placeholders = [
		"Search products, brands, categories...",
		"Search mobiles & gadgets...",
		"Search groceries & essentials...",
		"Search trending items...",
		"Find coupons & deals...",
	];
	useEffect(() => {
		const interval = setInterval(() => {
			setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [placeholders.length]);

	return (
		<div className='flex items-center justify-center gap-10'>
			{/* App Logo */}
			<div
				className='flex items-center gap-2 cursor-pointer'
				title='Rivora - Smart Ai E-commerce Platform'
				onClick={() => router.push("/user/app")}>
				<AppIcon />
				<AppLogo />
			</div>

			{/* Center Container */}
			<div className='flex items-center gap-10'>
				{/* Blogs & Trending */}
				<div className='flex items-center gap-6 h-8'>
					<p
						className='font-heading text-[22px] font-semibold cursor-pointer'
						onClick={() => router.push("/user/app/(Blogs)")}>
						Blogs
					</p>
					<Separator
						orientation='vertical'
						className='h-full bg-border'
					/>
					<p className='font-body text-[22px] font-extralight cursor-pointer'>
						Trending
					</p>
				</div>

				{/* Search Bar */}
				<div className='relative w-250 bg-gray-50 rounded-2xl'>
					{/* Left GIF icon */}
					<Image
						src='/icons/search.gif'
						alt='search'
						width={20}
						height={20}
						unoptimized
						className='absolute left-3 top-1/2 -translate-y-1/2'
					/>

					{/* Input */}
					<Input
						placeholder={placeholders[placeholderIndex]}
						className='pl-10 pr-16 font-heading rounded-[15px] h-13'
						onFocus={() => setOpen(true)}
					/>

					{/* Command + K hint */}
					<div
						onClick={() => setOpen(true)}
						className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-xs text-gray-500 cursor-pointer'>
						<span className='px-1.5 py-0.5 border rounded-md bg-white'>
							⌘
						</span>
						<span className='px-1.5 py-0.5 border rounded-md bg-white'>
							K
						</span>
					</div>
				</div>

				{/* Notification, WhishList, Cart */}
				<div className='flex justify-center items-center flex-row gap-7'>
					<Image
						src='/icons/notification.png'
						alt='Notifications'
						width={24}
						height={24}
						className='cursor-pointer'
					/>
					<Image
						src='/icons/heart.png'
						alt='Whishlist'
						width={24}
						height={24}
						className='cursor-pointer'
					/>
					<Image
						src='/icons/shopping-cart.png'
						alt='Cart'
						width={24}
						height={24}
						className='cursor-pointer'
					/>
				</div>

				{/* SingIn */}
				<div className='flex items-center h-10 justify-center gap-10'>
					<Separator
						orientation='vertical'
						className='h-full bg-border'
					/>
					<Button
						onClick={() => router.push("/login")}
						className='cursor-pointer w-33 h-13 font-heading font-extrabold bg-purple-500 hover:bg-purple-950'>
						Sign In
					</Button>
				</div>
			</div>

			{/* Command Dialog */}
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				className='!max-w-none !w-screen !h-screen !rounded-none !p-[40px] font-heading'>
				<div className='w-full h-full bg-white flex flex-col font-heading'>
					<CommandInput
						placeholder='Search products, pages...'
						className='h-16 text-lg border-b px-4 font-heading'
					/>

					<CommandList className='flex-1 overflow-auto pt-6 font-heading'>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandItem onSelect={() => router.push("/user/app")}>
							Home
						</CommandItem>

						<CommandItem
							onSelect={() => router.push("/user/app/(Blogs)")}>  
							Blogs {/*  Create a folder inside blog*/}
						</CommandItem>
					</CommandList>
				</div>
			</CommandDialog>
		</div>
	);
};
