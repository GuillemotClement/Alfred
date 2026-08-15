import { Pencil } from "lucide-react";
import Link from "next/link";

type ButtonEdit = {
  href: string;
};

export default function ButtonEdit({ href }: ButtonEdit) {
  return (
    <Link href={href} className="btn btn-primary">
      <Pencil />
    </Link>
  );
}
