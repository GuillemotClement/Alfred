import NewWorkplaceForm from "../_components/NewWorkplaceForm";
import { getWorkplaceCategories } from "../_services/workplace";

const NewWorkplacePage = async () => {
  const categories = await getWorkplaceCategories();

  return (
    <>
      <NewWorkplaceForm categories={categories} />
    </>
  );
};

export default NewWorkplacePage;
