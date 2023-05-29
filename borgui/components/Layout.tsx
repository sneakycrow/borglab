import { ReactNode } from "react";
import cx from "classnames";
import Navigation from "@/components/Navigation";
import Credits from "@/components/Credits";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const Layout = (props: LayoutProps) => {
  const classes = cx(
    "flex flex-col items-center min-h-screen py-2 w-2/3 mx-auto space-y-4",
    props.className
  );
  return (
    <main className={classes}>
      <Navigation title={props.title ?? ""} />
      {props.children}
      <Credits />
    </main>
  );
};

export default Layout;
