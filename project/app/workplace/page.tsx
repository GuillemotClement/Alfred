import { getWorkplace } from "./_services/workplace";
import ListWorkplace from "./_components/ListWorkplace";

const WorkplacePage = async () => {
  const workplaces = await getWorkplace();

  return <ListWorkplace workplaces={workplaces} />;
};

export default WorkplacePage;
