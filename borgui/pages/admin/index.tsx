import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const { data: session } = useSession({ required: true });
  return (
    <Layout title="admin">
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-2 w-full">
        <p className="text-gray-300 font-bold text-3xl">Content coming soon</p>
      </div>
    </Layout>
  );
};

export default AdminPage;
