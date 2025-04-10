import { useParams } from "next/navigation";

const AllContractDetails: React.FC = () => {
   const { id } = useParams();

   return <>
   hello from all contract
   </>;
};
export default AllContractDetails