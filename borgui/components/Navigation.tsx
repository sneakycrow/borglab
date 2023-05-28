import React from "react";
import Link from "next/link";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";

interface NavigationProps {
  title: string;
}

const NavLink = (props: { href: string; children: string }) => {
  return (
    <li className="text-black font-bold hover:text-green-500 transition-colors duration-300">
      <Link href={props.href}>{props.children}</Link>
    </li>
  );
};

const Navigation = (props: NavigationProps) => {
  const { data: session } = useSession();
  return (
    <header className="flex justify-between items-center w-full border-b-2 py-4">
      <div className="flex space-x-2 items-end">
        <Link href="/">
          <h2 className="text-3xl font-bold text-black hover:text-green-500 transition-colors duration-300">
            Borgui
          </h2>
        </Link>
        <h1 className="text-2xl font-bold text-gray-400">{props.title}</h1>
      </div>
      <nav className="flex items-center space-x-4">
        <ul className="flex justify-evenly space-x-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/admin">Admin</NavLink>
        </ul>
        {session && (
          <Profile
            image={session.user?.image ?? ""}
            name={session.user?.name ?? ""}
            email={session.user?.email ?? ""}
          />
        )}
      </nav>
    </header>
  );
};

export default Navigation;
