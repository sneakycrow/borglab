import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const { data: session } = useSession({ required: true });
  return (
    <Layout title="/admin">
      <div>
        <h1>Admin Page</h1>
      </div>
    </Layout>
  );
};

export default AdminPage;
