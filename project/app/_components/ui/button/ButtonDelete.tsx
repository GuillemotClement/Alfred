import { Trash } from "lucide-react";

type ButtonDelete = {
  onClick: () => void;
  isPending: boolean;
};

export default function ButtonDelete({ onClick, isPending }: ButtonDelete) {
  return (
    <button className="btn btn-error" onClick={onClick} disabled={isPending}>
      <Trash />
    </button>
  );
}
