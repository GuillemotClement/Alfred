import DetailWorkplace from "../_components/DetailWorkplace";
import { getWorkplaceById } from "../_services/workplace";

export default async function DetailWorkplacePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const workplace = await getWorkplaceById(id);

  console.log(workplace);

  return <DetailWorkplace workplace={workplace} />;
}
