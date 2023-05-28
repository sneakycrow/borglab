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
      <h1 className="text-4xl font-bold">{props.title}</h1>
      <nav className="flex items-center space-x-4">
        <ul className="flex justify-evenly space-x-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
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
