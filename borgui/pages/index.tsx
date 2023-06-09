import { useSession } from "next-auth/react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Layout from "@/components/Layout";
import Login from "@/components/Login";
import AvatarGenerator from "@/components/AvatarGenerator";

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
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] py-2 w-full">
          {!session ? <Login /> : <AvatarGenerator />}
        </div>
      </Layout>
    </Suspense>
  );
};

export default Home;
