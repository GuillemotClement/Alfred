"use client";

import { useState, useTransition } from "react";
import { deleteWorkplace } from "../_actions/workplace";
import { WorkplaceListing } from "../_schema/workplace";
import Image from "next/image";
import ButtonDelete from "@/app/_components/ui/button/ButtonDelete";
import ButtonEdit from "@/app/_components/ui/button/ButtonEdit";

type ListWorkplace = {
  workplaces: WorkplaceListing[];
};

const ListWorkplace = ({ workplaces }: ListWorkplace) => {
  const [isPending, startTransition] = useTransition(); // permet de gérer la transiton pour le btn
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    startTransition(async () => {
      setError(null);

      const result = await deleteWorkplace(id);

      if (!result.success) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="w-full">
      {error && <p className="text-error">{error}</p>}
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>Nom</th>
            <th>Adresse</th>
            <th>Commentaire</th>
            <th>Note</th>
            <th>Catégorie</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {workplaces.map((workplace) => (
            <tr
              key={workplace.id}
              className="hover:bg-base-300 hover:cursor-pointer text-center"
            >
              <td className="">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image
                        src={workplace.image ? workplace.image : "unknow.jpg"}
                        height={48}
                        width={48}
                        alt={workplace.name}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{workplace.name}</div>
                  </div>
                </div>
              </td>

              <td>
                {workplace.street}{" "}
                <span className="font-bold capitalize">{workplace.city}</span>
              </td>

              <td>{workplace.description}</td>

              <td>{workplace.note}</td>

              <td>
                <div className="badge badge-outline badge-secondary">
                  {workplace.categoryName}
                </div>
              </td>

              <td>
                <ButtonDelete
                  isPending={isPending}
                  onClick={() => handleDelete(workplace.id)}
                />
              </td>

              <td>
                <ButtonEdit href="/workspace/edit" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListWorkplace;
