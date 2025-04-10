import { useParams } from "next/navigation";

const MyContractDetails: React.FC = () => {
	const { id } = useParams();

	return <>
     Hello from my contract
   </>;
};
export default MyContractDetails