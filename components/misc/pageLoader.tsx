import { Loader2 } from "lucide-react";

const _Loader: React.FC = () => {
	return (
		<div className='w-full flex justify-center items-center h-full'>
			<Loader2 className='animate-spin h-5 w-5 md:h-14 md:w-14 text-primary' />
		</div>
	);
};
export default _Loader;
