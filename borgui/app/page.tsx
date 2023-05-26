import ViewerList, { Viewer } from "@/components/ViewerList";
import AvatarGenerator from "@/components/AvatarGenerator";

const Home = async () => {
  const viewers = await getViewers();
  return (
    <main className="flex flex-col items-center min-h-screen py-2">
      <AvatarGenerator />
      <ViewerList viewers={viewers} />
    </main>
  );
};

const getViewers = async (): Promise<Viewer[]> => {
  try {
    const res = await fetch(`${process.env.API_URL}/users`);
    const data = (await res.json()) as { viewers: Viewer[] };
    return data.viewers;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default Home;
