import { NavigationItem } from "@/app/_schema/schema";
import Link from "next/link";
import Linka from "../Linka";

type LayoutHeader = {
  title: string;
  navigations: NavigationItem[];
  rootHref: string;
};

export default function LayoutHeader({
  title,
  navigations,
  rootHref,
}: LayoutHeader) {
  return (
    <div className="flex justify-between py-3 px-5 items-center">
      <Link href={rootHref} className="btn btn-ghost">
        {title}
      </Link>
      <nav>
        <ul className="flex gap-x-3">
          {navigations.map((item) => (
            <li key={item.id}>
              <Linka href={item.href} text={item.text} />
            </li>
          ))}
          <li></li>
        </ul>
      </nav>
    </div>
  );
}
