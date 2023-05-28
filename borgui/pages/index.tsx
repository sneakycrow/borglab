import Login from "@/components/Login";
import { useSession } from "next-auth/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";

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
      <main className="flex flex-col items-center min-h-screen py-2">
        {!session ? (
          <Login />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Borgui</h1>
            <p className="text-2xl font-bold">Welcome {session.user?.name}</p>
            <Link href="/api/auth/signout" className="text-xl text-red-500">
              Sign out
            </Link>
            <div className="flex">
              <div className="h-[50vh] w-[50vh] flex items-center justify-center opacity-20 hover:opacity-100 cursor-pointer">
                <IconChevronLeft size={100} />
                <h4 className="text-4xl font-extrabold">Avatar Generator</h4>
              </div>
              <div className="h-[50vh] w-[50vh] flex items-center justify-center opacity-20 hover:opacity-100 cursor-pointer">
                <h4 className="text-4xl font-extrabold">Viewer Manager</h4>
                <IconChevronRight size={100} />
              </div>
            </div>
          </div>
        )}
      </main>
    </Suspense>
  );
};

export default Home;
