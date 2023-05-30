import { ReactNode } from "react";
import cx from "classnames";
import Navigation from "@/components/Navigation";
import Credits from "@/components/Credits";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const DEFAULT_TITLE = "borgui";
const Layout = (props: LayoutProps) => {
  const classes = cx(
    "flex flex-col items-center min-h-screen py-2 w-2/3 mx-auto space-y-4",
    props.className
  );
  return (
    <>
      <Head>
        <title>{`${DEFAULT_TITLE} ${
          props.title ? `- ${props.title}` : ""
        }`}</title>
      </Head>
      <main className={classes}>
        <Navigation title={props.title ?? ""} />
        {props.children}
        <Credits />
      </main>
    </>
  );
};

export default Layout;
