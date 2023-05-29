import { useSession } from "next-auth/react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Layout from "@/components/Layout";
import Login from "@/components/Login";
import { Canvas } from "@react-three/fiber";
import Box from "@/components/Box";

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
          {!session ? (
            <Login />
          ) : (
            <div className="min-h-[500px]">
              <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box />
              </Canvas>
            </div>
          )}
        </div>
      </Layout>
    </Suspense>
  );
};

export default Home;
