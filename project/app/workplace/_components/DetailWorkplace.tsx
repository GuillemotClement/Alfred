import { WorkplaceDetail } from "../_schema/workplace";
import Image from "next/image";

type DetailWorkplace = {
  workplace: WorkplaceDetail;
};

const DetailWorkplace = ({ workplace }: DetailWorkplace) => {
  const workplaceImage = workplace.image || "";

  return (
    <div className="">
      <h2>{workplace.name}</h2>
      <Image
        src={workplaceImage}
        width={100}
        height={100}
        alt={workplace.name}
      />
    </div>
  );
};

export default DetailWorkplace;
