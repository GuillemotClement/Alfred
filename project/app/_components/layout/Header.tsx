"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = authClient.useSession();

  const imgProfil =
    session?.user.image || "https://randomuser.me/api/portraits/lego/3.jpg";

  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="navbar bg-gray-600 shadow-sm text-white">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Alfred
        </Link>
      </div>

      {session ? (
        <div className="flex-none flex items-center gap-x-5">
          <ul className="flex gap-x-3">
            <li>
              <Link href="/house">Foyer</Link>
            </li>
            <li>
              <Link href="/workplace">Travail</Link>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  src={imgProfil}
                  width={40}
                  height={40}
                  alt={session.user.name}
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {/* <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li> */}
              <li>
                <button className="btn btn-warning" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex-none">
          <ul className="flex gap-x-3">
            <li>
              <Link href="/login" className="btn btn-primary">
                Connexion
              </Link>
            </li>
            <li>
              <Link href="/register" className="btn btn-neutral">
                Inscription
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
