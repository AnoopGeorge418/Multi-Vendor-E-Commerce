import { Navbar } from "@/components/layouts/Navbar";
import { SubNavbar } from "@/components/layouts/SubNavbar";

export default function Home() {
	return (
		<div className='flex min-h-screenbg-white text-black justify-center'>
			<div className='mt-8'>
				<Navbar />
				<hr className='mt-5' />
				<SubNavbar />
			</div>
		</div>
	);
}
