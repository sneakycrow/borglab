import { IconHeart } from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <Link
        href="https://sneakycrow.dev/"
        className="flex opacity-75 hover:opacity-100 transition-opacity"
      >
        made with <IconHeart color="red" className="mx-2" fill="red" /> by zach
      </Link>
    </footer>
  );
};

export default Footer;
