"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteWorkplace } from "../_actions/workplace";
import { WorkplaceListing } from "../_schema/workplace";

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
    <div className="">
      {error && <p className="text-error">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Ville</th>
            <th>Catégorie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {workplaces.map((workplace) => (
            <tr
              key={workplace.id}
              className="hover:bg-base-300 hover:cursor-pointer"
            >
              <td>{workplace.name}</td>
              <td>{workplace.street}</td>
              <td>{workplace.city}</td>
              <td>{workplace.categoryName}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  href={`/workplace/${workplace.id}`}
                >
                  Détail
                </Link>
                <button
                  className="btn btn-danger"
                  disabled={isPending}
                  onClick={() => handleDelete(workplace.id)}
                >
                  {isPending ? "Suppression..." : "Supprimer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListWorkplace;
