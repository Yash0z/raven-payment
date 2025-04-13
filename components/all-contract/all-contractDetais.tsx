import { TimelineType } from "@/types/types";

interface DataProps {
	data: {
		hexID: string;
		contractName: string;
		contractStatus: string;
		contractAmount: string;
		contractAgreement: string;
		createdBy: string;
		creationDate: string;
		expirationDate: string;
		timeline: TimelineType[];
	};
}
const AllContractDetails: React.FC<DataProps> = ({ data }) => {
	return <>hii{data?.contractAgreement}</>;
};
export default AllContractDetails;
