import { Box } from "@/components/dashboard/Main/header/box";

export default function Page() {
	return (
		<main className='h-full bg-background grid grid-rows-[2fr_1.5fr_4fr] rows-[header_main_footer] '>
			<div className='row-in-header grid grid-cols-[2fr_4fr] cols-[left_right]'>
				<div className='cols-in-left p-4'>
					<Box />
				</div>
				<div className='col-in-Right'></div>
			</div>
			<div className='row-in-main'> </div>
			<div className='row-in-footer 2xl:grid xl:grid-cols-[3fr_4fr] cols-[left_right]'>
				<div className='md:cols-in-left w-full'>{/* <Footer /> */}</div>
			</div>
		</main>
	);
}
