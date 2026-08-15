import { connection } from "next/server";
import NewWorkplaceForm from "../_components/NewWorkplaceForm";
import { getWorkplaceCategories } from "../_services/workplace";

const NewWorkplacePage = async () => {
  await connection();
  const categories = await getWorkplaceCategories();

  return (
    <>
      <NewWorkplaceForm categories={categories} />
    </>
  );
};

export default NewWorkplacePage;
