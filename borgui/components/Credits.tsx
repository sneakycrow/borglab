import Image from "next/image";
import Link from "next/link";

const Credits = () => {
  return (
    <div className="absolute bottom-0 left-0 flex justify-end items-end">
      <Link
        href="https://sneakycrow.dev/"
        className="flex opacity-50 hover:opacity-100 transition-opacity duration-300"
      >
        <Image
          width={50}
          height={50}
          src="https://sneakycrow.dev/logo_v2.svg"
          alt="Line art of a crow wearing a baseball hat, logo for Sneaky Crow LLC"
        />
        <p className="text-xs flex items-center">made by Sneaky Crow</p>
      </Link>
    </div>
  );
};

export default Credits;
