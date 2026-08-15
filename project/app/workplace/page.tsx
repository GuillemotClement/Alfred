import { getWorkplace } from "./_services/workplace";
import ListWorkplace from "./_components/ListWorkplace";
import { getUserIdFromSession } from "../_helpers/session";
import { notFound } from "next/navigation";

const WorkplacePage = async () => {
  const userId = await getUserIdFromSession();

  if (!userId) {
    notFound();
  }

  const workplaces = await getWorkplace(userId);

  return <ListWorkplace workplaces={workplaces} />;
};

export default WorkplacePage;
