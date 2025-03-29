import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBrandGithub } from "@tabler/icons-react";

export function SiteHeader() {
	return (
		<header className=' flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
			<div className='flex w-full justify-between gap-1 px-4 '>
				<SidebarTrigger className='-ml-1' />
				<Separator
					orientation='vertical'
					className='mx-2 data-[orientation=vertical]:h-4'
				/>
				<div className='ml-auto flex items-center gap-2'>
					<Button variant='ghost' asChild size='sm' className='flex'>
						<a
							href='https://github.com/Yash0z/raven-payment.git'
							rel='noopener noreferrer'
							target='_blank'
						>
							<span>
								<IconBrandGithub />
							</span>
						</a>
					</Button>
				</div>
			</div>
		</header>
	);
}
