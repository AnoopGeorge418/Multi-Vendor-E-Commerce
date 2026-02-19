"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

const categories = [
	"All",
	"Electronics",
	"Fashion",
	"Home & Kitchen",
	"Beauty",
	"Sports",
	"Automotive",
	"Books",
	"Groceries",
	"Mobiles",
	"Health",
	"Toys",
	"Gaming",
	"Watches",
	"Furniture",
	"Travel",
	"Baby Products",
	"Deals",
];

const ElectronicsCategories = [{}]
const FashionCategories = [{}]
const Home_KitchenCategories = [{}]
const BeautyCategories = [{}]
const SportsCategories = [{}]
const AutomativeCategories = [{}]
const BooksCategories = [{}]
const GrocieriesCategories =[{}]
const MobileCategories = [{}]
const HealthCategories = [{}]
const ToysCategories = [{}]
const GamingCategories = [{}]
const WatchesCategories = [{}]
const FurnitureCategories = [{}]
const TravelCategories = [{}]
const BabyPorductsCategires = [{}]
const DealsCategories =[{}]

export const SubNavbar = () => {
	const [active, setActive] = useState("All");
	const [hovered, setHovered] = useState<string | null>(null);

	return (
		<div className='w-full relative border-b'>
			{/* Top Row */}
			<div className='flex items-center justify-between px-6 py-3'>
				{/* Categories */}
				<div className='flex gap-7 items-center'>
					{categories.map((cat) => (
						<div
							key={cat}
							onMouseEnter={() =>
								cat !== "All"
									? setHovered(cat)
									: setHovered(null)
							}
							onMouseLeave={() => setHovered(null)}>
							{active === cat ? (
								<Button
									onClick={() => setActive(cat)}
									className='bg-purple-100 text-purple-700 hover:bg-purple-200  px-4'>
									{cat}
								</Button>
							) : (
								<span
									onClick={() => setActive(cat)}
									className='font-heading font-semibold text-[16px] cursor-pointer text-gray-700 hover:text-purple-600 transition'>
									{cat}
								</span>
							)}
						</div>
					))}
				</div>

				{/* Right Side Button */}
				<Button className='font-heading bg-purple-500 cursor-pointer text-white hover:bg-purple-800 '>
					Become a Seller
				</Button>
			</div>

			{/* SINGLE MEGA HOVER CARD */}
			{hovered && (
				<div
					className='absolute left-0 top-full w-full bg-white border-none shadow-lg z-50 p-6 mt-[-9]'
					onMouseEnter={() => setHovered(hovered)}
					onMouseLeave={() => setHovered(null)}>
					<h3 className='text-lg font-bold mb-2'>{hovered}</h3>

					<p className='text-sm text-gray-600'>
						Explore trending {hovered.toLowerCase()} products, best
						deals, new arrivals, and top rated items.
					</p>

					{/* Example grid content */}
					<div className='grid grid-cols-4 gap-4 mt-4 text-sm text-gray-700'>
						<div>Top Picks</div>
						<div>Best Sellers</div>
						<div>New Arrivals</div>
						<div>Deals & Offers</div>
					</div>
				</div>
			)}
		</div>
	);
};
