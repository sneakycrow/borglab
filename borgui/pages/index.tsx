import { useSession } from "next-auth/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import Layout from "@/components/Layout";
import Login from "@/components/Login";

const Home = () => {
  const { data: session, status } = useSession();
  if (status === "loading")
    return (
      <main className="min-h-screen min-w-full flex justify-center items-center">
        <LoadingSpinner />
      </main>
    );
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout title="borgui">
        <div className="flex flex-col items-center justify-center min-h-[50vh] py-2 w-full">
          {!session ? (
            <Login />
          ) : (
            <div className="flex w-full space-x-10">
              <Link
                href="/"
                className="min-h-[50vh] h-full w-full flex items-center justify-end opacity-20 hover:opacity-100 cursor-pointer transition-opacity duration-300"
              >
                <IconChevronLeft size={100} />
                <h4 className="text-4xl font-extrabold">Viewer Portal</h4>
              </Link>
              <Link
                href="/admin"
                className="min-h-[50vh] h-full w-full flex items-center justify-start opacity-20 hover:opacity-100 cursor-pointer transition-opacity duration-300"
              >
                <h4 className="text-4xl font-extrabold">Staff Portal</h4>
                <IconChevronRight size={100} />
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </Suspense>
  );
};

export default Home;
