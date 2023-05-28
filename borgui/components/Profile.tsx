import Image from "next/image";
import { useState } from "react";
import cx from "classnames";
import { signOut } from "next-auth/react";

interface ProfileProps {
  image: string;
  name: string;
  email: string;
}

const Profile = (props: ProfileProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const menuClasses = cx(
    "flex flex-col ml-4 items-end justify-center absolute -bottom-[100%] right-0 bg-white p-2 rounded-md shadow-md"
  );
  return (
    <div
      className="flex flex-col items-end justify-center hover:cursor-pointer relative"
      onClick={() => setOpen(!open)}
      onBlur={() => setOpen(false)}
    >
      <Image
        src={props.image}
        alt={props.name}
        width={50}
        height={50}
        className="rounded-full"
      />
      {open && (
        <div className={menuClasses}>
          <h1 className="text-sm font-bold">{props.name}</h1>
          <p className="text-xs text-gray-500">{props.email}</p>
          <button className="text-xs text-red-500" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
